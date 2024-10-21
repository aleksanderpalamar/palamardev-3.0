const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-50 border-t border-zinc-800 py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Aleksander Palamar. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer