
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
];

const defaultCode = {
  javascript: 'console.log("Hello, world!");',
  python: 'print("Hello, world!")',
  cpp: '#include <iostream>\n\nint main() {\n  std::cout << "Hello, world!" << std::endl;\n  return 0;\n}',
  java: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, world!");\n  }\n}',
};

type CodeEditorProps = {
  roomId: string;
};

export function CodeEditor({ roomId }: CodeEditorProps) {
  const { toast } = useToast();
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(defaultCode.javascript);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Reset the code when language changes
    setCode(defaultCode[language as keyof typeof defaultCode]);
  }, [language]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("Running code...");
    
    // Simulate code execution with delay
    setTimeout(() => {
      let simulatedOutput;
      
      switch (language) {
        case "javascript":
          simulatedOutput = "JavaScript Output:\nHello, world!";
          if (input.trim()) {
            simulatedOutput += "\n\nInput received: " + input;
          }
          break;
        case "python":
          simulatedOutput = "Python Output:\nHello, world!";
          if (input.trim()) {
            simulatedOutput += "\n\nInput received: " + input;
          }
          break;
        default:
          simulatedOutput = `${language.charAt(0).toUpperCase() + language.slice(1)} Output:\nHello, world!`;
          if (input.trim()) {
            simulatedOutput += "\n\nInput received: " + input;
          }
      }
      
      setOutput(simulatedOutput);
      setIsRunning(false);
      
      toast({
        title: "Code executed successfully",
        description: "To enable real execution, connect to a backend service.",
      });
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
      <div className="lg:col-span-2 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleRunCode} disabled={isRunning}>
            {isRunning ? "Running..." : "Run Code"}
          </Button>
        </div>
        
        <Textarea
          className="flex-1 font-mono p-4 bg-code text-code-foreground code-scroll min-h-[300px]"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here..."
        />
      </div>
      
      <div className="flex flex-col space-y-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">Input</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              className="font-mono code-scroll h-24"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input for your program..."
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">Output</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-mono bg-secondary/50 rounded-md p-3 h-48 overflow-auto code-scroll whitespace-pre-wrap">
              {output || "Output will appear here..."}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
