import { LogoMark } from "../icons";
import { NavPills } from "../nav-pills";
import { MobileMenu } from "../mobile-menu";
import { APP_HREF, DEMO_HREF } from "../../site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <a href="#top" className="logo">
          <LogoMark size={28} />
          New Perspectives AI
        </a>

        <div className="header-mid">
          <NavPills />
        </div>

        <div className="header-end">
          <a className="btn btn-light header-login" href={APP_HREF}>
            Log in
          </a>
          <a className="btn header-demo" href={DEMO_HREF}>
            Book a demo
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
