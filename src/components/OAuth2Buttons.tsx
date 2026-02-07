
import { Button } from "./ui/button";
import { Github, Mail } from "lucide-react";
import { NavLink } from "react-router";

function OAuth2Buttons() {
  return (
    <div className="grid gap-3">
      <NavLink
        to={`${
          import.meta.env.VITE_BASE_URL || "http://3.110.155.78.nip.io:8080"
        }/oauth2/authorization/google`}
      >
        <Button variant="outline" className="w-full flex items-center gap-2 cursor-pointer">
          <Mail className="h-4 w-4" /> Continue with Google
        </Button>
      </NavLink>
      <NavLink
        to={`${
          import.meta.env.VITE_BASE_URL || "http://3.110.155.78.nip.io:8080"
        }/oauth2/authorization/github`}
      >
        <Button variant="outline" className="w-full flex items-center gap-2 cursor-pointer">
          <Github className="h-4 w-4" /> Continue with GitHub
        </Button>
      </NavLink>
    </div>
  );
}

export default OAuth2Buttons;
