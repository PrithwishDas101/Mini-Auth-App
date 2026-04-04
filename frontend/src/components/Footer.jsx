export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Auth Project - Built with React & Express</p>
      </div>
    </footer>
  );
}