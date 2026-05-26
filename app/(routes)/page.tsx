// home page
import AuthButtons from "@/components/AuthButtons";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-neutral-primary bg-[url('/background-img-2.jpg')] bg-cover bg-center bg-no-repeat p-8">
      <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-8 rounded-3xl border border-white/10 bg-black/30 px-8 py-12 text-center shadow-2xl backdrop-blur-sm">
        <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-4">
              Generate Images with AI CANVAS
            </h1>
            <p className="text-lg text-slate-400">
              Describe your idea and let our AI generate stunning images
            </p>
        </div>
        <AuthButtons />
      </div>
    </main>
  );
}