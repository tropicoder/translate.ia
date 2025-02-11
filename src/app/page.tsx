"use client";
import React, { useState } from "react";
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
import {
  AlertCircle,
  ChevronRight,
  FileText,
  Languages,
  Loader2Icon,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getTitle } from "@/lib/utils";
import Image from "next/image";
import { errors, languages, limit, minimum } from "@/constants/data";

export default function Home() {
  const [sourceText, setSourceText] = useState("");
  const [loading, setLoading] = useState(false);
  const [finalText, setFinalText] = useState("");
  const [error, setError] = useState("");
  const langs = languages;
  const [targetLanguage, setTargetLanguage] = useState(langs[1].value);

  const handleTranslate = async () => {
    if (sourceText.split(" ").length > limit) {
      setError(errors.length);
      return;
    } else if (sourceText.split(" ").length < minimum) {
      setError(errors.mini);
      return;
    } else if (sourceText === "") {
      setError(errors.empty);
    } else {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: sourceText,
            lang: targetLanguage,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          setLoading(false);
          setError(data.message);
          setFinalText("");
        } else {
          setLoading(false);
          setFinalText(data.text);
        }
      } catch {
        setLoading(false);
        setError(errors.system);
        setFinalText("");
      }
    }
  };

  return (
    <div className="h-screen w-full min-w-[460px] bg-gray-100">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto p-4 lg:p-6  flex items-center gap-2">
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
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="flex space-x-4">
          <Button variant="outline" className="flex  items-center gap-2 h-14">
            <div className="">
              <Languages style={{ width: "40px", height: "30px" }} />
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
              <FileText style={{ width: "30px", height: "30px" }} />
            </div>
            <div className="flex flex-col justify-start items-start">
              <div className="text-gray-950 font-bold">
                Traduire des fichiers
              </div>
              <div className="text-gray-500 text-sm">.pdf, .docx, .pptx</div>{" "}
            </div>
          </Button>
        </div>

        <Card className="p-6 rounded-md">
          {error != "" && (
            <div className="pb-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="pt-1">{error}</AlertDescription>
              </Alert>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div className="space-y-4">
              <Textarea
                disabled={loading}
                placeholder="Saisissez votre texte"
                value={sourceText}
                onChange={(e) => {setSourceText(e.target.value);setError("")}}
                className="min-h-[300px] resize-none"
              />
              <div className="flex gap-2 items-center pt-1">
                <span className={loading ? "text-muted-foreground" : ""}>
                  Traduire en
                </span>
                <Select
                  disabled={loading}
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
                  disabled={loading}
                  onClick={handleTranslate}
                >
                  {loading ? (
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
      <div className="max-w-5xl mx-auto  text-center text-sm text-gray-500">
        &copy; 2025 tech.cg
      </div>
    </div>
  );
}
