#!/usr/bin/env python
from __future__ import print_function
import sys

if __name__ == "__main__":
    (mx, my) = sys.argv[1:3]

    mx = int(mx)
    my = int(my)

    print("(mx: {}, my: {})".format(mx, my))

    hx = (3*mx - my)
    hy = (mx + 2*my)

    print("(hx: {}, hy: {})".format(hx, hy))
    
    my1 = (3*hy - hx) / 7.0
    mx1 = hy - 2*my1

    print("(mx: {}, my: {})".format(mx1, my1))

