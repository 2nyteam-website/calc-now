"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurrencyInput from "@/components/currency-input";

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function generatePassword(
  length: number,
  useUpper: boolean,
  useLower: boolean,
  useNumbers: boolean,
  useSymbols: boolean
): string {
  let charset = "";
  if (useUpper) charset += UPPERCASE;
  if (useLower) charset += LOWERCASE;
  if (useNumbers) charset += NUMBERS;
  if (useSymbols) charset += SYMBOLS;

  if (charset.length === 0) return "";

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }
  return password;
}

function getCharsetSize(useUpper: boolean, useLower: boolean, useNumbers: boolean, useSymbols: boolean): number {
  let size = 0;
  if (useUpper) size += 26;
  if (useLower) size += 26;
  if (useNumbers) size += 10;
  if (useSymbols) size += SYMBOLS.length;
  return size;
}

function getStrength(entropy: number): { label: string; color: string; bgColor: string; percent: number } {
  if (entropy < 40) return { label: "Weak", color: "text-red-600", bgColor: "bg-red-500", percent: 25 };
  if (entropy < 60) return { label: "Fair", color: "text-yellow-600", bgColor: "bg-yellow-500", percent: 50 };
  if (entropy < 80) return { label: "Strong", color: "text-green-600", bgColor: "bg-green-500", percent: 75 };
  return { label: "Very Strong", color: "text-blue-600", bgColor: "bg-blue-500", percent: 100 };
}

function formatCrackTime(entropy: number): string {
  // Assume 10 billion guesses per second (modern GPU cluster)
  const guessesPerSecond = 1e10;
  const totalCombinations = Math.pow(2, entropy);
  const seconds = totalCombinations / guessesPerSecond / 2; // average case

  if (seconds < 1) return "Instantly";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000 * 1000) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 31536000 * 1e6) return `${Math.round(seconds / (31536000 * 1000))} thousand years`;
  if (seconds < 31536000 * 1e9) return `${Math.round(seconds / (31536000 * 1e6))} million years`;
  if (seconds < 31536000 * 1e12) return `${Math.round(seconds / (31536000 * 1e9))} billion years`;
  return `${(seconds / (31536000 * 1e12)).toExponential(1)} trillion years`;
}

export default function PasswordGenerator() {
  const [lengthStr, setLengthStr] = useState("16");
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);

  const length = useMemo(() => {
    const n = parseInt(lengthStr) || 16;
    return Math.max(4, Math.min(128, n));
  }, [lengthStr]);

  const charsetSize = getCharsetSize(useUpper, useLower, useNumbers, useSymbols);
  const entropy = charsetSize > 0 ? length * Math.log2(charsetSize) : 0;
  const strength = getStrength(entropy);
  const crackTime = formatCrackTime(entropy);

  const handleGenerate = useCallback(() => {
    const pw = generatePassword(length, useUpper, useLower, useNumbers, useSymbols);
    setPassword(pw);
    setGenerated(true);
    setCopied(false);
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  // Generate on first render
  useMemo(() => {
    if (!generated) {
      const pw = generatePassword(16, true, true, true, true);
      setPassword(pw);
      setGenerated(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleCopy() {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = password;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Password Generator</h1>
        <p className="text-muted-foreground mt-1">
          Generate strong, secure random passwords with customizable options.
        </p>
        <Badge variant="secondary" className="mt-2">No data sent to server</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pw-length">Password Length</Label>
              <CurrencyInput id="pw-length" value={lengthStr} onChange={setLengthStr} />
              <p className="text-xs text-muted-foreground">Min: 4, Max: 128</p>
            </div>

            <div className="space-y-3">
              <Label>Character Types</Label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useUpper}
                  onChange={(e) => setUseUpper(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm">Uppercase (A-Z)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useLower}
                  onChange={(e) => setUseLower(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm">Lowercase (a-z)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useNumbers}
                  onChange={(e) => setUseNumbers(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm">Numbers (0-9)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useSymbols}
                  onChange={(e) => setUseSymbols(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm">Symbols (!@#$%^&*)</span>
              </label>
            </div>

            <Button onClick={handleGenerate} className="w-full" disabled={charsetSize === 0}>
              Generate Password
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Password</CardTitle>
          </CardHeader>
          <CardContent aria-live="polite">
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-5">
                <p className="text-sm text-blue-600 mb-2">Your Password</p>
                {password ? (
                  <p className="text-xl font-bold text-blue-700 font-mono break-all leading-relaxed">{password}</p>
                ) : (
                  <p className="text-xl font-bold text-muted-foreground">Select at least one character type</p>
                )}
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleCopy}
                disabled={!password}
              >
                {copied ? "Copied!" : "Copy to Clipboard"}
              </Button>

              {password && (
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Strength</span>
                      <span className={`font-semibold ${strength.color}`}>{strength.label}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${strength.bgColor}`}
                        style={{ width: `${strength.percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Entropy</span>
                      <span className="font-semibold">{entropy.toFixed(1)} bits</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Charset Size</span>
                      <span className="font-semibold">{charsetSize} characters</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Est. Crack Time</span>
                      <span className="font-semibold">{crackTime}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="how-to">How to Use</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">About the Password Generator</h2>
          <p>
            A <strong>strong password</strong> is your first line of defense against unauthorized access to your accounts. This <strong>password generator</strong> creates truly random passwords using the <strong>Web Crypto API</strong> (crypto.getRandomValues), the same cryptographic randomness used by security professionals. Unlike Math.random(), this method provides unpredictable, cryptographically secure random numbers that cannot be guessed or reproduced.
          </p>
          <p>
            Password strength is measured in <strong>entropy</strong>, which represents the number of possible combinations an attacker would need to try. Entropy is calculated as the password length multiplied by log2 of the <strong>character set size</strong>. A 16-character password using all character types (uppercase, lowercase, numbers, symbols) has approximately 105 bits of entropy, which would take billions of years to crack even with modern hardware.
          </p>
          <p>
            The <strong>estimated crack time</strong> shown below assumes an attacker with a powerful GPU cluster capable of 10 billion guesses per second. This is a realistic estimate for offline attacks against hashed passwords. For online attacks with rate limiting, the actual crack time would be astronomically longer. Always use a <strong>unique password</strong> for each account and consider using a <strong>password manager</strong> to store them securely.
          </p>
        </TabsContent>
        <TabsContent value="how-to" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How to Use</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Set your desired <strong>password length</strong> (default is 16 characters, recommended minimum for strong security).</li>
            <li>Check or uncheck the <strong>character types</strong> you want to include: uppercase letters, lowercase letters, numbers, and symbols.</li>
            <li>Click <strong>Generate Password</strong> to create a new random password.</li>
            <li>Click <strong>Copy to Clipboard</strong> to copy the password for use in your accounts.</li>
            <li>Check the <strong>strength indicator</strong> and estimated crack time to ensure your password is strong enough.</li>
          </ul>
        </TabsContent>
        <TabsContent value="faq" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <p><strong>Is this password generator secure?</strong> Yes. It uses crypto.getRandomValues(), a cryptographically secure random number generator built into your browser. No passwords are sent to any server or stored anywhere.</p>
          <p><strong>What password length should I use?</strong> We recommend at least 16 characters with all character types enabled. For high-security accounts, use 20 or more characters.</p>
          <p><strong>Why should I include symbols?</strong> Symbols dramatically increase the character set size, which exponentially increases the number of possible combinations. A 12-character password with symbols is much stronger than one without.</p>
          <p><strong>How is crack time estimated?</strong> The estimate assumes a brute-force attack at 10 billion guesses per second (a realistic rate for a modern GPU cluster). Real-world crack times depend on the hashing algorithm used and the attacker&apos;s resources.</p>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Related Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Link href="/calculators/unit-converter" className="text-sm text-primary hover:underline">Unit Converter</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/percentage" className="text-sm text-primary hover:underline">Percentage Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/date" className="text-sm text-primary hover:underline">Date Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/age" className="text-sm text-primary hover:underline">Age Calculator</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
