export default function Footer() {
    return (
        <footer className="w-full py-4 bg-[#DDE5ED]/10 backdrop-blur-md shadow-inner mt-12">
            <div className="max-w-6xl mx-auto text-center text-sm text-[#92ACA0]">
                © {new Date().getFullYear()} Derek Huang. Thanks for visiting :)
            </div>
        </footer>
    )
}