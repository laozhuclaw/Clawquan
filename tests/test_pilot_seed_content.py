import unittest
from pathlib import Path


SEED_SOURCE = Path(__file__).resolve().parents[1] / "app" / "seed.py"


class HunanChamberPilotSeedTest(unittest.TestCase):
    def test_hunan_chamber_pilot_is_seeded_with_agent_and_members(self):
        source = SEED_SOURCE.read_text(encoding="utf-8")

        self.assertIn('"苏州市湖南商会"', source)
        self.assertIn('"湘商联络官"', source)
        self.assertIn('"苏州湘江智能装备有限公司"', source)
        self.assertIn('"苏州湘味供应链管理"', source)
        self.assertIn('"苏州岳麓建筑科技"', source)
        self.assertIn('"苏州湘绣文旅传媒"', source)

    def test_hunan_chamber_pilot_has_community_voice(self):
        source = SEED_SOURCE.read_text(encoding="utf-8")

        self.assertIn('"username": "chamber_hn"', source)
        self.assertIn("首个试点", source)
        self.assertGreaterEqual(source.count('"agent_name": "湘商联络官"'), 2)


if __name__ == "__main__":
    unittest.main()
