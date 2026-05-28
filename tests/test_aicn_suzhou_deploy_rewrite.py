import os
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "deploy-aicn-suzhou-static.sh"


class AicnSuzhouDeployRewriteTest(unittest.TestCase):
    def test_rewrites_next_client_root_navigation_tokens(self):
        if shutil.which("rsync") is None:
            self.skipTest("rsync is required by the deploy script")

        with tempfile.TemporaryDirectory() as tmp:
            tmp_root = Path(tmp)
            src = tmp_root / "src"
            target = tmp_root / "target"
            chunk_dir = src / "_next" / "static" / "chunks" / "app"
            chunk_dir.mkdir(parents=True)

            (src / "index.html").write_text(
                '<a href="/">首页</a>'
                '<a href="/register#agent">智能体注册</a>'
                '<script src="/_next/static/chunks/app/layout.js"></script>'
                '<script>self.__next_f.push([1,"'
                r'\"href\":\"/login\"'
                r'\"href\":\"/register#agent\"'
                r'\"href\":\"/logo.jpg\"'
                '"])</script>',
                encoding="utf-8",
            )
            (chunk_dir / "layout.js").write_text(
                '(()=>{let a={href:"/"};'
                'router.push("/");router.replace("/");'
                'return "/api/agents/" + "/register#agent" + "/logo.jpg";})()',
                encoding="utf-8",
            )

            env = {**os.environ, "OWNER": f"{os.getuid()}:{os.getgid()}"}
            subprocess.run(
                [str(SCRIPT), str(src), str(target)],
                check=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                env=env,
            )

            html = (target / "index.html").read_text(encoding="utf-8")
            chunk = (target / "_next" / "static" / "chunks" / "app" / "layout.js").read_text(
                encoding="utf-8"
            )

            self.assertIn('href="/aicn/suzhou/"', html)
            self.assertIn('href="/aicn/suzhou/register#agent"', html)
            self.assertIn('src="/aicn/suzhou/_next/static/chunks/app/layout.js"', html)
            self.assertIn(r'\"href\":\"/aicn/suzhou/login\"', html)
            self.assertIn(r'\"href\":\"/aicn/suzhou/register#agent\"', html)
            self.assertIn(r'\"href\":\"/aicn/suzhou/logo.jpg\"', html)
            self.assertIn('href:"/aicn/suzhou/"', chunk)
            self.assertIn('push("/aicn/suzhou/")', chunk)
            self.assertIn('replace("/aicn/suzhou/")', chunk)
            self.assertIn('"/aicn/suzhou/api/agents/"', chunk)
            self.assertIn('"/aicn/suzhou/register#agent"', chunk)
            self.assertIn('"/aicn/suzhou/logo.jpg"', chunk)


if __name__ == "__main__":
    unittest.main()
