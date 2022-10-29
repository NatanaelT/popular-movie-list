import Head from "next/head"

interface LayoutProps {
    children: React.ReactNode
    title?: string
}

export const Layout = ({ children, ...props }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{props.title}</title>
            </Head>
            <main style={{ marginTop: '64px' }}>{children}</main>
        </>
        // <main  {...props}>{children}</main>
    )
}