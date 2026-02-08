
import { Button } from "./ui/button";
import { Github, Mail } from "lucide-react";
import { OAUTH2_ENDPOINTS } from "@/constants";


function OAuth2Buttons() {
  return (
    <div className="grid gap-3">
      <a
        href={OAUTH2_ENDPOINTS.GOOGLE}
      >
        <Button variant="outline" className="w-full flex items-center gap-2 cursor-pointer">
          <Mail className="h-4 w-4" /> Continue with Google
        </Button>
      </a>
      <a
        href={OAUTH2_ENDPOINTS.GITHUB}
      >
        <Button variant="outline" className="w-full flex items-center gap-2 cursor-pointer">
          <Github className="h-4 w-4" /> Continue with GitHub
        </Button>
      </a>
    </div>
  );
}

export default OAuth2Buttons;
