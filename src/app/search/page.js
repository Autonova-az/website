'use client'



import SearchPageClient from "@/app/search/SearchPageClient";
import {getServerLocale} from "@/utils/locale";

export default function SearchPage({searchParams}) {

    const locale = getServerLocale(searchParams)

    return (
       <SearchPageClient locale ={locale}/>
    )
}
