import Header from "../components/Header";

export default function layout({ children }: { children: React.ReactNode }) {
  return <> <Header /> <section>{children}</section> </>;
}
