#!/usr/bin/env python
from __future__ import print_function
import sys
import math

if __name__ == "__main__":
    (hx, hy) = sys.argv[1:3]

    hx = int(hx)
    hy = int(hy)
    
    print("(hx: {}, hy: {})".format(hx, hy))
    
    my = (3*hy - hx) / 7.0
    mx = (hy - 2*my)

    print("(mx: {}, my: {})".format(mx, my))

    hxf =(3*mx - my)
    hyf =(mx + 2*my)

    print("(hxf: {}, hyf: {})".format(hxf, hyf))
    mxi = round(mx)
    myi = round(my)

    print("(mxi: {}, myi: {})".format(mxi, myi))


    hxi =(3*mxi - myi)
    hyi =(mxi + 2*myi)

    print("(hx1: {}, hy1: {})".format(hxi, hyi))
