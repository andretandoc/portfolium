import { getPageBySlugWithPageLinks } from "@/lib/api/pages/queries";
import { HomeIcon, Link } from "lucide-react";
import { notFound } from "next/navigation";

interface PageLink {
    id: string;
    url: string;
    title: string;
}

export default async function SharedPage({
    params,
}: {
    params: {slug: string};
}) {
    const {page, pageLinks} = await getPageBySlugWithPageLinks(params.slug);
    
    if (page === null) notFound();
    if (page.public === false) return <main>This page is not public</main>
    return (
    <main>
        <div className="flex flex-col bg-[#708238] h-screen items-center justify-center py-8 px-4 text-center">
        <header className="mb-10">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gray-300" />
          </div>
          <h1 className="text-2xl font-bold mt-4 text-white">{page.name}</h1>
          <p className="text-white">{page.description}</p>
        </header>
        <nav className="flex-1 w-full max-w-md flex flex-col gap-4">
            {pageLinks.map((l: PageLink) => (
                <Link key={l.id} href={l.url}>
                    <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-300 bg-white hover:bg-gray-200 transition-all duration-300">
                        <HomeIcon className="text-gray-500 w-5 h-5" />
                        <span className="text-gray-800">{l.title}</span>
                    </div>
                </Link> 
            ))}
        </nav>
      </div>
    </main>
    );
}
