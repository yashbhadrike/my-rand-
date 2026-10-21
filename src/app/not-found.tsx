import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import NotFound from "./(site)/not-found";

export default function RootNotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <NotFound />
      </main>
      <Footer />
    </>
  );
}
