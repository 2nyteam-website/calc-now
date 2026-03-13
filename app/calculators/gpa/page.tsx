"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurrencyInput from "@/components/currency-input";

const GRADE_OPTIONS = [
  { label: "A+", value: 4.0 },
  { label: "A", value: 4.0 },
  { label: "A-", value: 3.7 },
  { label: "B+", value: 3.3 },
  { label: "B", value: 3.0 },
  { label: "B-", value: 2.7 },
  { label: "C+", value: 2.3 },
  { label: "C", value: 2.0 },
  { label: "C-", value: 1.7 },
  { label: "D+", value: 1.3 },
  { label: "D", value: 1.0 },
  { label: "D-", value: 0.7 },
  { label: "F", value: 0.0 },
];

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: string;
}

let nextId = 5;

function getClassification(gpa: number) {
  if (gpa >= 3.7) return { label: "Summa Cum Laude", color: "text-blue-600" };
  if (gpa >= 3.5) return { label: "Magna Cum Laude", color: "text-green-600" };
  if (gpa >= 3.0) return { label: "Cum Laude", color: "text-green-600" };
  if (gpa >= 2.0) return { label: "Good Standing", color: "text-yellow-600" };
  return { label: "Academic Probation", color: "text-red-600" };
}

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "", grade: "A", credits: "3" },
    { id: 2, name: "", grade: "B+", credits: "3" },
    { id: 3, name: "", grade: "A-", credits: "3" },
    { id: 4, name: "", grade: "B", credits: "3" },
  ]);

  function updateCourse(id: number, field: keyof Course, value: string) {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }

  function addCourse() {
    setCourses((prev) => [...prev, { id: nextId++, name: "", grade: "A", credits: "3" }]);
  }

  function removeCourse(id: number) {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }

  const result = useMemo(() => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    for (const course of courses) {
      const credits = parseFloat(course.credits) || 0;
      const gradeOption = GRADE_OPTIONS.find((g) => g.label === course.grade);
      const gradePoints = gradeOption ? gradeOption.value : 0;

      totalCredits += credits;
      totalGradePoints += gradePoints * credits;
    }

    const gpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
    const classification = getClassification(gpa);

    return { gpa, totalCredits, totalGradePoints, classification };
  }, [courses]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">GPA Calculator</h1>
        <p className="text-muted-foreground mt-1">
          Calculate your grade point average from course grades and credit hours.
        </p>
        <Badge variant="secondary" className="mt-2">No data sent to server</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Courses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {courses.map((course) => (
                <div key={course.id} className="flex items-end gap-2">
                  <div className="space-y-1 flex-1">
                    {course.id === courses[0]?.id && (
                      <Label className="text-xs text-muted-foreground">Course Name</Label>
                    )}
                    <Input
                      type="text"
                      placeholder="Course name"
                      className="h-10"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1 w-20">
                    {course.id === courses[0]?.id && (
                      <Label className="text-xs text-muted-foreground">Grade</Label>
                    )}
                    <select
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                    >
                      {GRADE_OPTIONS.map((g) => (
                        <option key={g.label} value={g.label}>
                          {g.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1 w-20">
                    {course.id === courses[0]?.id && (
                      <Label className="text-xs text-muted-foreground">Credits</Label>
                    )}
                    <CurrencyInput
                      id={`credits-${course.id}`}
                      value={course.credits}
                      onChange={(val) => updateCourse(course.id, "credits", val)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10 p-0 text-muted-foreground hover:text-red-500"
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length <= 1}
                  >
                    &times;
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={addCourse} className="w-full">
              + Add Course
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your GPA</CardTitle>
          </CardHeader>
          <CardContent aria-live="polite">
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-5 text-center">
                <p className="text-sm text-blue-600 mb-1">Grade Point Average</p>
                <p className="text-4xl font-bold text-blue-700">{result.gpa.toFixed(2)}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Classification</span>
                  <span className={`font-semibold ${result.classification.color}`}>
                    {result.classification.label}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Total Credits</span>
                  <span className="font-semibold">{result.totalCredits}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Total Grade Points</span>
                  <span className="font-semibold">{result.totalGradePoints.toFixed(1)}</span>
                </div>
              </div>
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
          <h2 className="text-lg font-semibold text-foreground">About the GPA Calculator</h2>
          <p>
            Your <strong>Grade Point Average (GPA)</strong> is one of the most important numbers in your academic career. It summarizes your overall academic performance into a single number on a <strong>4.0 scale</strong>. Universities, graduate programs, scholarships, and employers all use GPA as a quick measure of your academic achievement. This calculator computes your GPA accurately using the standard <strong>weighted average formula</strong>.
          </p>
          <p>
            The formula is straightforward: multiply each course&apos;s <strong>grade points</strong> by its <strong>credit hours</strong>, sum them all up, and divide by the total number of credit hours. For example, an A (4.0) in a 4-credit course contributes more to your GPA than an A in a 1-credit course. This weighted approach ensures that more demanding courses have a proportionally larger impact on your final GPA.
          </p>
          <p>
            This calculator uses the <strong>standard American grading scale</strong> where A+ and A both equal 4.0, and each step down (A-, B+, B, etc.) decreases by 0.3 or 0.4 points. It also shows your <strong>GPA classification</strong> ranging from Summa Cum Laude (3.7+) to Academic Probation (below 2.0), helping you understand where you stand academically.
          </p>
        </TabsContent>
        <TabsContent value="how-to" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How to Use</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Enter your <strong>course name</strong> (optional) to keep track of which class each row represents.</li>
            <li>Select the <strong>letter grade</strong> you received from the dropdown menu (A+ through F).</li>
            <li>Enter the <strong>number of credit hours</strong> for that course.</li>
            <li>Click <strong>Add Course</strong> to add more rows as needed, or click the X button to remove a course.</li>
            <li>Your <strong>GPA</strong> and classification update automatically as you enter grades.</li>
          </ul>
        </TabsContent>
        <TabsContent value="faq" className="prose prose max-w-none mt-4 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <p><strong>Is A+ the same as A?</strong> On the standard 4.0 scale, both A+ and A are worth 4.0 grade points. Some institutions give A+ a 4.3 value, but the 4.0 cap is most common.</p>
          <p><strong>Can I calculate my cumulative GPA?</strong> Yes. Enter all courses from all semesters to get your cumulative GPA. You can also calculate a single semester by only entering that semester&apos;s courses.</p>
          <p><strong>What does the classification mean?</strong> GPA classifications like Summa Cum Laude (highest honors) and Magna Cum Laude (high honors) are Latin honors commonly awarded at graduation. The thresholds vary by institution, but the ranges shown here are widely used.</p>
          <p><strong>What if I have pass/fail courses?</strong> Pass/fail courses typically do not affect GPA since they carry no grade points. Simply do not include them in your calculation.</p>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Related Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Link href="/calculators/percentage" className="text-sm text-primary hover:underline">Percentage Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/age" className="text-sm text-primary hover:underline">Age Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/salary" className="text-sm text-primary hover:underline">Salary Calculator</Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/calculators/compound-interest" className="text-sm text-primary hover:underline">Compound Interest Calculator</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
