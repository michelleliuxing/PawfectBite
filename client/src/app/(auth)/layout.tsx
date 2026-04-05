export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#FFF9F2] font-sans selection:bg-[#F7B2B7] selection:text-[#4A3B32]">
      {children}
    </div>
  );
}
