function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-4 mt-5">
      <div className="container">
        <h5 className="fw-bold">LearnHub</h5>
        <p>
          Empowering students with quality education and skill development.
        </p>
        <p className="mb-0">
          © {new Date().getFullYear()} LearnHub. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
