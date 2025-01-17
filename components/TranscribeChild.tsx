"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, Play, Pause, Download, Copy, FileAudio, Loader2, AudioLines} from "lucide-react";

interface TranscriptionResult {
  text: string;
  words: Array<{
    text: string;
    start: number;
    end: number;
    confidence: number;
  }>;
}

export default function TranscribeChild() {

  
  

  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcriptionProgress, setTranscriptionProgress] = useState(0);
  const [transcriptionResult, setTranscriptionResult] = useState<TranscriptionResult | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [editedText, setEditedText] = useState<string>(""); // For editing transcription

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setEditedText('')
    if (file && file.type.startsWith("audio/")) {
      setFile(file);
      setTranscriptionResult(null);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an audio file (MP3, WAV, M4A)",
        variant: "destructive",
      });
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a']
    },
    maxFiles: 1
  });

  // Ensure the audio element is updated when the file is set
  useEffect(() => {
    if (file && audioRef.current) {
      const audioURL = URL.createObjectURL(file);
      audioRef.current.src = audioURL;
      audioRef.current.load();
    }
  }, [file]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false); // Reset the play state when the audio ends
  };

  const handleTranscription = async () => {
    if (!file) return;

    setIsTranscribing(true);
    setTranscriptionProgress(0);

    try {
      // Upload the file to AssemblyAI
      const uploadResponse = await fetch("https://api.assemblyai.com/v2/upload", {
        method: "POST",
        headers: { authorization: "5071ef518f5543a7910bdf323991e2bb" },
        body: file,
      });
      setTranscriptionProgress(30);
      const uploadData = await uploadResponse.json();

      // Start the transcription process
      const transcriptionResponse = await fetch("https://api.assemblyai.com/v2/transcript", {
        method: "POST",
        headers: {
          authorization: "5071ef518f5543a7910bdf323991e2bb",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audio_url: uploadData.upload_url,
          language_code: selectedLanguage,
        }),
      });
      setTranscriptionProgress(70);
      const transcriptionData = await transcriptionResponse.json();

      // Poll for transcription progress
      const checkStatus = async () => {
        const statusResponse = await fetch(
          `https://api.assemblyai.com/v2/transcript/${transcriptionData.id}`,
          {
            headers: { authorization: "5071ef518f5543a7910bdf323991e2bb" },
          }
        );
        const statusData = await statusResponse.json();

        if (statusData.status === "completed") {
          setTranscriptionProgress(100);
          setTranscriptionResult(statusData);
          setIsTranscribing(false);
        } else if (statusData.status === "failed") {
          setIsTranscribing(false);
          toast({
            title: "Transcription Failed",
            description: "An error occurred during transcription.",
            variant: "destructive",
          });
        } else {
          //setTranscriptionProgress(statusData.acoustic_model_progress * 100);
          setTimeout(checkStatus, 5000);
        }
      };

      checkStatus();
    } catch (error) {
      setIsTranscribing(false);
      toast({
        title: "Error",
        description: "An error occurred during transcription.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (transcriptionResult) {
      const blob = new Blob([transcriptionResult.text], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "transcription.txt";
      link.click();
      URL.revokeObjectURL(link.href);
    }
  };

  const handleCopy = async () => {
    if (transcriptionResult) {
      try {
        await navigator.clipboard.writeText(transcriptionResult.text);
        toast({
          title: "Copied to clipboard",
          description: "The transcription has been copied successfully.",
          variant: "default",
        });
      } catch (err) {
        toast({
          title: "Copy failed",
          description: "Could not copy the transcription. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSave = () => {
    if (transcriptionResult) {
      setTranscriptionResult({ ...transcriptionResult, text: editedText });
      toast({
        title: "Saved",
        description: "The transcription text has been updated.",
        variant: "default",
      });
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8 pl-4">Audio Transcription</h1>

      <Card className="p-6 mb-8 mx-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary"}`}
        >
          <input {...getInputProps()} />
          <FileAudio className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg mb-2">
            {isDragActive ? "Drop the audio file here" : "Drag & drop an audio file here"}
          </p>
          <p className="text-sm text-gray-500">or click to select a file</p>
          <p className="text-xs text-gray-400 mt-2">Supported formats: MP3, WAV, M4A</p>
        </div>
      </Card>

      {file && (
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Audio Preview</h2>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={togglePlayPause}>
            <AudioLines />
            </Button>
            <span className="text-sm text-gray-500">{file.name}</span>
          </div>
          <audio
            ref={audioRef}
            onEnded={handleAudioEnded}
            controls
            className="w-full mt-4"
          />
        </Card>
      )}

      {file && !transcriptionResult && (
        <Card className="p-6 mb-8 ">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleTranscription} disabled={isTranscribing} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 font-medium  transition-all flex items-center">
                {isTranscribing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Transcribing...
                  </>
                ) : (
                  "Start Transcription"
                )}
              </Button>
            </div>
            {isTranscribing && (
              <Progress value={transcriptionProgress} className="w-full" />
            )}
          </div>
        </Card>
      )}

{transcriptionResult && (
  <Card className="p-6">
    <div className="flex justify-between items-center mb-4 space-x-2">
      <h2 className="text-xl font-semibold">Transcription Result</h2>
      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download & Share
        </Button>
        <Button variant="outline" size="sm" onClick={handleCopy}>
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
      </div>
    </div>
    <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap">
      <textarea
        className="focus:outline-none focus:border-none p-4 rounded-sm w-full"
        rows={10}
        value={editedText || transcriptionResult.text} // Display transcription result if editedText is empty
        onChange={(e) => setEditedText(e.target.value)} // Allow editing
      />
      <Button className="mt-4" onClick={handleSave}>Save</Button>
    </div>
  </Card>
)}

    </div>
  );
}
