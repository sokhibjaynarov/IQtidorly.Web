// ----------------------------------------------------------------------

const ROOTS = {
  HOME: '/landing',
  STUDENTS: '/students',
  AUTH: '/auth',
  TEACHERS: '/teachers',
  DESCRIPTION: '/description',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUpTeacher: `${ROOTS.AUTH}/jwt/sign-up-teacher`,
      signUpStudent: `${ROOTS.AUTH}/jwt/sign-up-student`,
      signOTP: `${ROOTS.AUTH}/jwt/sign-otp`,
      signRole: `${ROOTS.AUTH}/jwt/sign-role`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.HOME,
    one: `${ROOTS.TEACHERS}/one`,
    two: `${ROOTS.TEACHERS}/test`,
    question: `${ROOTS.TEACHERS}/test/create`,
    edit: (id: string) => `${ROOTS.TEACHERS}/test/${id}`,
    three: `${ROOTS.TEACHERS}/three`,
    five: `${ROOTS.TEACHERS}/five`,
    books: `${ROOTS.TEACHERS}/books`,
    booksCreate: `${ROOTS.TEACHERS}/books/create`,
    editsBook: (id: string) => `${ROOTS.TEACHERS}/books/${id}`,
    author: `${ROOTS.TEACHERS}/author`,
    authorCreate: `${ROOTS.TEACHERS}/author/create`,
    edits: (id: string) => `${ROOTS.TEACHERS}/author/${id}`,
  },
  // HOME
  home: {
    landing: ROOTS.HOME,
  },
  // Students Page
  students: {
    root: ROOTS.STUDENTS,
    description: (id: string) => `${ROOTS.STUDENTS}/${id}`,
    diagnostic: (id: string, attampt_id: string) => `${ROOTS.STUDENTS}/${id}/${attampt_id}`,
    result: (id: string, attampt_id: string) => `${ROOTS.STUDENTS}/${id}/${attampt_id}/result`,
  },
  description: {
    root: ROOTS.DESCRIPTION,
  },
};
