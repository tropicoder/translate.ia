"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, ChevronRight, Loader2Icon, Mic, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getTitle } from "@/lib/utils";
import Image from "next/image";
import { languages } from "@/constants/data";

// Add this at the top of the file, after imports
declare global {
  class WebkitSpeechRecognition {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    onstart: () => void;
    onend: () => void;
    onresult: (event: { results: [[{ transcript: string }]] }) => void;
  }

  interface Window {
    webkitSpeechRecognition: typeof WebkitSpeechRecognition;
  }
}

export default function Home() {
  const [sourceText, setSourceText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const langs = languages;
  const [targetLanguage, setTargetLanguage] = useState(langs[1].value);
  let recognition: WebkitSpeechRecognition | null = null;

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "fr-FR"; // Set to French for speech recognition

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => {
        setIsListening(false);
        setShowOverlay(false); // Close overlay when done
      };
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSourceText((prev) => prev + " " + transcript);
      };
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setShowOverlay(true);
      recognition.start();
    } else {
      alert(
        "Votre navigateur ne prend pas en charge la reconnaissance vocale."
      );
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const handleTranslate = async () => {
    if (sourceText === "") {
      setError("Le texte ne peut pas être vide");
      return;
    }

    try {
      setError("");
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: sourceText,
          lang: targetLanguage,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        setFinalText("");
      } else {
        setFinalText(data.text);
      }
    } catch {
      setError("Une erreur système s'est produite");
      setFinalText("");
    }
  };

  return (
    <div className="h-screen w-full min-w-[460px] bg-gray-100 ">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto p-4 lg:p-6 flex items-center gap-2">
          <Image
            src={"/logo.jpg"}
            height={40}
            width={40}
            alt="Logo groupe Whatsapp Congo.tech"
            title="Logo groupe Whatsapp Congo.tech"
            className="rounded-full"
          />
          <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">
            {getTitle()}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 ">
        <div className="flex justify-start space-x-4 py-6">
          <Button variant="outline" className="flex items-center gap-2 h-14">
            <div className="">
              {/* <Languages style={{ width: "40px", height: "30px" }} /> */}
            </div>
            <div className="flex flex-col justify-start items-start">
              <div className="text-blue-600 font-bold">Traduire du texte</div>
              <div className="text-gray-500 text-sm">
                {langs.length} langues
              </div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 h-14"
            disabled
          >
            <div>
              {/* <FileText style={{ width: "30px", height: "30px" }} /> */}
            </div>
            <div className="flex flex-col justify-start items-start">
              <div className="text-gray-950 font-bold">
                Traduire des fichiers
              </div>
              <div className="text-gray-500 text-sm">.pdf, .docx, .pptx</div>
            </div>
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-2 ">
        <Card className="p-6 rounded-md">
          {error && (
            <div className="pb-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="pt-1">{error}</AlertDescription>
              </Alert>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div className="space-y-4">
              <div className="relative">
                {/* 🎯 Textarea with space for the mic button */}
                <Textarea
                  disabled={isListening}
                  placeholder="Saisissez votre texte"
                  value={sourceText}
                  onChange={(e) => {
                    setSourceText(e.target.value);
                    setError("");
                  }}
                  className="min-h-[300px] resize-none pr-16 pb-16 rounded-lg"
                />

                {/* 🎤 ChatGPT-Style Microphone Button */}
                <div className="absolute bottom-4 right-4 flex items-center">
                  <div className="relative group">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={isListening}
                      onClick={startListening}
                      className="w-12 h-12 rounded-full bg-gray-900 hover:bg-gray-700 text-white flex 
                        items-center justify-center transition-all duration-200 shadow-lg"
                    >
                      {isListening ? (
                        <Loader2Icon className="animate-spin w-6 h-6 text-white" />
                      ) : (
                        <Mic className="w-6 h-6 text-white" />
                      )}
                    </Button>

                    {/* Tooltip "Utilise ta voix" */}
                    <div
                      className="absolute -top-9 left-1/2 -translate-x-1/2 text-xs font-medium 
                        bg-gray-900 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 
                        transition-opacity shadow-md"
                    >
                      Utilise ta voix
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 items-center pt-1">
                <span className={isListening ? "text-muted-foreground" : ""}>
                  Traduire en
                </span>
                <Select
                  disabled={isListening}
                  value={targetLanguage}
                  onValueChange={setTargetLanguage}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sélectionner une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    {langs.map((language) => (
                      <SelectItem key={language.value} value={language.value}>
                        {language.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  disabled={isListening}
                  onClick={handleTranslate}
                >
                  {isListening ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    <ChevronRight />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder="Traduction"
                value={finalText}
                readOnly
                className="min-h-[355px] resize-none bg-gray-50"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* 🎙️ Overlay Screen (Opens when Listening) */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white">
          <h2 className="text-xl font-semibold mb-4">🎙 Écoute en cours...</h2>

          {/* 🎤 Animated Pulse Effect */}
          <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center animate-pulse">
            <Mic className="w-10 h-10 text-white" />
          </div>

          {/* 🛑 Stop Listening Button */}
          <Button
            onClick={stopListening}
            className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg flex items-center"
          >
            <X className="w-5 h-5 mr-2" /> Arrêter
          </Button>
        </div>
      )}

      <div className="max-w-5xl mx-auto text-center text-sm text-gray-500 pb-4">
        &copy; 2025 tech.cg
      </div>
    </div>
  );
}
