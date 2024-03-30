import WithAuth from "../components/auth/withAuth";

export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <WithAuth>
            {children}
        </WithAuth>
    );
  }