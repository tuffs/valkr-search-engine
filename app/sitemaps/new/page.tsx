import Title from "@/components/Title";
import SearchBar from "@/components/SearchBar";

export default function CreateSitemap() {
  return (
    <div className="font-sans p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Title size="main" />
        <div className='w-full'>
          <h3
            className='text-center text-5xl text-white text-bolder'
          >
            Import a Sitemap
          </h3>
        </div>
        <SearchBar />
      </main>
    </div>
  );
}