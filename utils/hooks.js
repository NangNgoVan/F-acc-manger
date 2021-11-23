import { useEffect, useState } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

const fetcher = (url) =>
    fetch(url)
        .then((r) => r.json())
        .then((data) => {
            return { user: data?.user || null }
        })

export function useUser({ redirectTo, redirectIfFound } = {}) {
    const { data, error } = useSWR('/api/user', fetcher)
    const user = data?.user
    const isLoading = !data && !error
    const isError = error
    const hasUser = Boolean(user)

    useEffect(() => {
        if (!redirectTo || isLoading) return
        if (
            (redirectTo && !redirectIfFound && !hasUser) ||
            (redirectIfFound && hasUser)
        ) {
            console.log(redirectTo, data, isLoading, isError)
            Router.push(redirectTo)
        }
    }, [redirectTo, redirectIfFound, isLoading, hasUser])

    return { user: user, loading: isLoading, error: isError }
}

export function useCaculatePageContentHeight() {
    useEffect(() => {
        function caculatePageContentHeight() {
            var pageContainer = document.getElementsByClassName("page-container")[0]
            if (pageContainer) {
                var availableHeight = window.innerHeight - pageContainer.offsetTop //- pageContainer.offsetHeight
                pageContainer.style.minHeight = availableHeight + 'px'
            }
        }
        caculatePageContentHeight()
        window.addEventListener('resize', caculatePageContentHeight)
        return ()=> {
            window.removeEventListener('resize', caculatePageContentHeight)
        }
    })
}
