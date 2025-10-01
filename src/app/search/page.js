'use client'



import SearchPageClient from "@/app/search/SearchPageClient";
import {getServerLocale} from "@/utils/locale";

export default async function SearchPage({searchParams}) {

    const locale = await  getServerLocale(searchParams)

    return (
       <SearchPageClient locale ={locale}/>
    )
}
