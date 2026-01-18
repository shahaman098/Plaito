export default function ArchiveLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="fixed inset-0 top-[60px] overflow-hidden bg-[#2c3e50]">
            {children}
        </div>
    );
}
