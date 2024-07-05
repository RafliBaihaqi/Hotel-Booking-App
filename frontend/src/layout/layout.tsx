import Header from "../components/header";
import Hero from "../components/hero";
import Footer from "../components/footer";

//Define children properties
interface Props {
  children: React.ReactNode;
}
const layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
