export default function Footer() {
  return (
    <footer className="site-footer">
      <a className="footer-logo" href="#home">
        Mute&Rack
      </a>

      <span className="footer-copyright">
        © {new Date().getFullYear()} Mute&Rack
      </span>
    </footer>
  );
}