import React from "react";
import CalculateGPA from "../Components/Forms/CalculateGPA";
import CoursesRating from "../Components/Forms/CoursesRating";
import FindeBestFlow from "../Components/Forms/FindBestFlow";
import FindExpenses from "../Components/Forms/FindExpenses";
import MissingStudents from "../Components/Forms/MissingStudents";
import MostPopularCourses from "../Components/Forms/MostPopularCourses";
import MostPopularTeachers from "../Components/Forms/MostPopularTeachers";
import Profit from "../Components/Forms/Profit";
import SelectedSubjects from "../Components/Forms/SelectedSubjects";
import StudentSchedule from "../Components/Forms/StudentSchedule";
import TeacherSchedule from "../Components/Forms/TeacherSchedule";
import TeachersRating from "../Components/Forms/TeachersRating";

export const selectValues = [
    {
        value: "most_popular_courses",
        key: "most_popular_courses",
        label: "Find most popular courses",
        component: <MostPopularCourses />
    },
    {
        value: "most_popular_teachers",
        key: "most_popular_teachers",
        label: "Find most popular teachers",
        component: <MostPopularTeachers />
    },
    {
        value: "calculate_gpa",
        key: "calculate_gpa",
        label: "Calculate student's GPA and Total",
        component: <CalculateGPA />
    },
    {
        value: "missing_students",
        key: "missing_students",
        label: "Find unregistered students",
        component: <MissingStudents />
    },
    {
        value: "find_expenses",
        key: "find_expenses",
        label: "Calculate term and total retake expenses",
        component: <FindExpenses />
    },
    {
        value: "teacher_schedule",
        key: "teacher_schedule",
        label: "Design teacher schedule",
        component: <TeacherSchedule />
    },
    {
        value: "student_schedule",
        key: "student_schedule",
        label: "Design student schedule",
        component: <StudentSchedule />
    },
    {
        value: "selected_subjects",
        key: "selected_subjects",
        label: "Find how many subjects and credits were selected",
        component: <SelectedSubjects />
    },
    {
        value: "best_flow",
        key: "best_flow",
        label: "Find most clever flow of students by the average rating for the subject and teacher",
        component: <FindeBestFlow />
    },
    {
        value: "teachers_rating",
        key: "teachers_rating",
        label: "Find teachers rating for the semester",
        component: <TeachersRating />
    },
    {
        value: "courses_rating",
        key: "courses_rating",
        label: "Find courses rating for the semester",
        component: <CoursesRating />
    },
    {
        value: "profit",
        key: "profit",
        label: "Calculate total number of retakes for all time and display the profit $$$",
        component: <Profit />
    },
];