import { StudentLayout } from 'src/layouts/student';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthGuard>
      <StudentLayout>{children}</StudentLayout>
    </AuthGuard>
  );
}
