
import SearchPageClient from "@/app/search/SearchPageClient";
import {getServerLocale} from "@/utils/locale";
import Navbar from "@/components/Navbar";

export default async function SearchPage({searchParams}) {

    const locale = await  getServerLocale(searchParams)

    return (
        <>
            <Navbar searchParams={searchParams} locale={locale}/>
            <SearchPageClient locale ={locale}/>
        </>
    )
}
