import json
import random

import constants
from levelbuilder.levelbuilder import build_region
import levelbuilder.towns as towns


class Location():
    """This is a class to load resources that may be required by the game."""

    def __init__(self, location_code):
        self.location_code = location_code
        scode = location_code.split(":")
        self.world = scode[0]
        self.coords = int(scode[1]), int(scode[2])
        self.sublocations = []
        scode = scode[3:]

        self._terrain_cache = None
        self._hitmap_cache = None

        # Parse sublocation information.
        while scode:
            subloc_type = scode[0]
            coords = int(scode[1]), int(scode[2])
            if subloc_type != "b":
                self.sublocations.append((subloc_type, coords))
                scode = scode[3:]
            else:
                self.sublocations.append((subloc_type, coords, scode[3]))
                scode = scode[4:]

    def is_town(self):
        random.seed(self.coords[0] * 1000 + self.coords[1])

        # We need to seed before we test for forced towns because this also
        # seeds the town generator.
        if self.coords == (0, 0):
            return True
        return random.randint(0, 5) == 0

    def is_dungeon(self):
        if self.is_town():
            return False
        random.seed(self.coords[0] * 1001 + self.coords[1] * 2 + 1)
        return random.randint(0, 5)

    def generate(self):
        """Generate the static terrain elements for a particular location."""

        if self._terrain_cache is not None and self._hitmap_cache is not None:
            return self._terrain_cache, self._hitmap_cache

        # TODO: Generate the level if it doesn't already automatically exist.

        tileset, level = build_region(
                self.coords[0], self.coords[1],
                constants.level_width, constants.level_height)
        hitmap = [[0 for x in range(constants.level_width)] for
                  y in range(constants.level_height)]
        if self.is_town():
            # Already seeded by is_town method.
            level, hitmap = towns.build_town(level, hitmap)

        self._terrain_cache = level
        self._hitmap_cache = hitmap

        return level, hitmap

    def render(self, avx, avy):
        """Render the JSON representation of the level."""

        level, hitmap = self.generate()

        return {"x": self.coords[0],
                 "y": self.coords[1],
                 "w": constants.level_width,
                 "h": constants.level_height,
                 "def_tile": 0,
                 "avatar": {"x": avx, "y": avy,
                            "image": "static/images/avatar.png"},
                 "images": {"npc": "static/images/npc.png"},
                 "tileset": "default.png",
                 "level": level,
                 "hitmap": hitmap,
                 "port": constants.port}

    def __str__(self):
        return self.location_code

