import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SEED_SOURCE = ROOT / "app" / "seed.py"
FRONTEND_SOURCES = [
    ROOT / "web" / "src" / "app" / "layout.tsx",
    ROOT / "web" / "src" / "app" / "page.tsx",
    ROOT / "web" / "src" / "app" / "login" / "page.tsx",
    ROOT / "web" / "src" / "app" / "register" / "page.tsx",
    ROOT / "web" / "src" / "app" / "components" / "Hero.tsx",
    ROOT / "web" / "src" / "app" / "components" / "KeyCollaborationNetwork.tsx",
    ROOT / "web" / "src" / "app" / "components" / "Navbar.tsx",
    ROOT / "web" / "src" / "app" / "components" / "StatsStrip.tsx",
    ROOT / "web" / "src" / "app" / "components" / "OrgTreePreview.tsx",
    ROOT / "web" / "src" / "app" / "components" / "AgentList.tsx",
    ROOT / "web" / "src" / "app" / "organizations" / "page.tsx",
    ROOT / "web" / "src" / "app" / "community" / "page.tsx",
    ROOT / "web" / "src" / "app" / "opportunities" / "page.tsx",
]


class ThreeLayerCollaborationContentTest(unittest.TestCase):
    def test_seed_contains_three_layer_collaboration_units(self):
        source = SEED_SOURCE.read_text(encoding="utf-8")

        self.assertIn("苏州市社会组织智能协作平台", source)
        self.assertIn('"苏州市社会组织总会"', source)
        self.assertIn('"苏州市湖南商会"', source)
        self.assertIn('"苏州市南通商会"', source)
        self.assertIn('"苏州市北京商会"', source)
        self.assertIn('"苏州市全民国防教育协会"', source)

        self.assertIn("江苏中享绿色建筑产业发展有限公司", source)
        self.assertIn("苏州工业园区诚弘机械有限公司", source)
        self.assertIn("苏州创元投资发展（集团）有限公司", source)
        self.assertIn("东南电梯股份有限公司", source)
        self.assertIn("苏州纽克斯电源技术股份有限公司", source)

    def test_public_copy_uses_three_layer_language_not_pilot_language(self):
        combined = "\n".join(
            path.read_text(encoding="utf-8") for path in [SEED_SOURCE, *FRONTEND_SOURCES]
        )

        self.assertIn("三层协作", combined)
        self.assertIn("横向交流", combined)
        self.assertIn("湖南商会 × 全民国防教育协会", combined)
        self.assertIn("北京商会 × 南通商会", combined)

        pilot_word = "试" + "点"
        forbidden_phrases = [
            f"{pilot_word}单位",
            f"首个{pilot_word}",
            f"{pilot_word}智能体",
            f"{pilot_word}机会",
            f"申请加入{pilot_word}",
        ]
        for phrase in forbidden_phrases:
            self.assertNotIn(phrase, combined)

    def test_customer_demo_highlights_key_orgs_enterprises_and_agent_entry(self):
        combined = "\n".join(
            path.read_text(encoding="utf-8") for path in FRONTEND_SOURCES
        )

        required_copy = [
            "苏州市社会组织总会智能协作平台",
            "苏州市社会组织总会",
            "苏州市湖南商会",
            "苏州市南通商会",
            "苏州市北京商会",
            "苏州市全民国防教育协会",
            "苏州纽克斯电源技术股份有限公司",
            "江苏中享绿色建筑产业发展有限公司",
            "苏州京泰建筑工程",
            "东南电梯股份有限公司",
            "总会智能体",
            "商会/协会智能体",
            "企业智能体",
            "纵向连接",
            "横向撮合",
            "智能体注册",
            "/register#agent",
        ]

        for text in required_copy:
            self.assertIn(text, combined)


if __name__ == "__main__":
    unittest.main()
