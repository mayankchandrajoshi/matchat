import SideBar from "@/components/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen p-5 bg-neutral-800">
        <div className="w-full h-full bg-slate-900 flex flex-row">
            <SideBar/>
            {children}
        </div>
    </div>
  )
}