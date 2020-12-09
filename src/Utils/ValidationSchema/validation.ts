import * as Yup from "yup";

export const PopularSchema = Yup.object().shape({
  ders_kod: Yup.string().required("Cannot be empty!"),
  year: Yup.number().required("Cannot be empty!").min(2017).max(2019),
  term: Yup.number().required("Cannot be empty!"),
});

export const PopularCoursesSchema = Yup.object().shape({
  year: Yup.number().required("Cannot be empty!").min(2017).max(2019),
  term: Yup.number().required("Cannot be empty!"),
});

export const GPASchema = Yup.object().shape({
  year: Yup.number().required("Cannot be empty!").min(2017).max(2019),
  term: Yup.number().required("Cannot be empty!"),
  stud_id: Yup.string().required("Cannot be empty!"),
});


export const TeacherScheduleSchema = Yup.object().shape({
  year: Yup.number().required("Cannot be empty!").min(2017).max(2019),
  term: Yup.number().required("Cannot be empty!"),
  emp_id: Yup.string().required("Cannot be empty!"),
});

export const BestFlowSchema = Yup.object().shape({
  year: Yup.number().required("Cannot be empty!").min(2017).max(2019),
  term: Yup.number().required("Cannot be empty!"),
  emp_id: Yup.number().required("Cannot be empty!"),
  ders_kod: Yup.string().required("Cannot be empty!"),
});