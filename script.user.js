// ==UserScript==
// @name                Stream Speeder
// @description         speed up/down video
// @version             0.1.4
// @author              Yos_sy
// @match               *://*.amazon.com/*
// @match               *://*.amazon.ca/*
// @match               *://*.amazon.com.mx/*
// @match               *://*.amazon.co.uk/*
// @match               *://*.amazon.de/*
// @match               *://*.amazon.fr/*
// @match               *://*.amazon.it/*
// @match               *://*.amazon.es/*
// @match               *://*.amazon.nl/*
// @match               *://*.amazon.se/*
// @match               *://*.amazon.pl/*
// @match               *://*.amazon.co.jp/*
// @match               *://*.amazon.com.au/*
// @match               *://*.amazon.in/*
// @match               *://*.amazon.cn/*
// @match               *://*.amazon.com.br/*
// @match               *://*.amazon.sa/*
// @match               *://*.amazon.ae/*
// @match               *://*.amazon.sg/*
// @match               *://*.amazon.com.tr/*
// @match               *://*.netflix.com/*
// @namespace           http://tampermonkey.net/
// @icon                data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAZrUlEQVR4Xu2dCXQUVbqAx3PeG50374w6DwiBkABJQBG3EXfHJzroPFwAQVAEgiSEXVFHUHYQEDEiZBcYlIBsruxCuro73QEEHZVFSXejgAsiKunqIJvi//7/dqpz61Z1unpDnHO/c+5Jp+uvu/z/3bf+3e8kEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKR/Fujeu3t0D2B7m7x2bmCuywz01WS2cddmj3DWZj+pmNu6lbHvLQaR2H6oaqi1kfJ4feH6Ds7PiMZksV3HqwqzWor+ncuUOux/7fqdfRFvfev9TkuEp+fFTDwLn6P7QT+BdWjAH4uF2V+LdB4t6yb3argyQcu3F00uhm4SzJg28tZUFWSCW/PTIfyf6TAC8ObwqSBTWHCgCYwa0hTKEa5lVPTwF7YFmUzoWJ8M5ia2wRWTWm2Z8vLl5W5SzJvFsP5NQjU2P8Ljf+J6lWY3lWPzRfwKf8jyiUdv6fSiREBlgEaXJYod7ZwlWY2cZdmjXMWtvKsntkS+j9wG2x77wNYt34T9LozGwb0uAqeGJULJSXF8M7qdeCufg8+/Hg3fLxzT1Buw2ZYtGgRTBz3JNx0VQrKlcDOXZ/CU0+MgpLHU8FV3BqwdvBgGM9gzdBEDP9sgTp+iBlep3fHOFEuqdR5lYswEicF4/8qGaCqLPNiZ1HGzKqijDpXcRtYMrEVDBv8MBw/fgJ++eUX5g4cOAj5+fnw7bffhr47c+ZM6LP2/88//wzjxo2Dqiqn7vmcFwtgWl5z2FKWDVUYBoWFboazJPOsV7+o40dY6W8wPta+lW5RLqn4vfZuhlzose0T5ZKNu7TdKDTEEVdxW6guy4K5j6XCxPHPMOPxkBF/+OEHyMvLA6/Xy/4Xn9fV1cHQoUNh9+7dhudn8P9Vq16H3HtTsInIBFdpFlCYLGyMgxivZOL3Ku2NBU85iU3DhaJs0lA99kXGSNj/KcolC1R+ZlVR+nbswIGrJIsZf/bwVCgqKjIYT4O+P3XqFIwaNcqQCY4fPw6DBg2CL7/8stH3t2zdBpdmNYPZw6g2yGJhUxwwI7xHcRLjmSyo3dcXPlYY7xXlkgZGwKNr/zECAY+jmyiXDLbM79gf23mVlI+dPWaIZ/qnwn333mso+WaQsSdMmBAyNP19/fXXsdqvsvT+Sy+9BOXl86H/3engLM5kHUuKi7Oolb8a4ybGNxlgDWwsgD5HiSiXFPwee4YhcK9ymvoFomyiQcM/T22wZnz62/9u7Jw5XfDoo4+GLb08R48ehWeffVaXAdatWwcbN2609P6MGTPgu+++g/3Yr+hz3w2w/gWqhYJxobg5C9NmifFONKjznvomGPsBNZU7RLmkgAH2Ngn8A1GOUH32P2OGuYnGreKzaKguan++syh9BXXySNlU6qqw9D3YtQN4ffuY4agEP/7447BkyZKw7tVXX2X9gEOHDumMTSWfMlB5ebnhHd4999xzUFhYyN7V+g05D92DQ8uM+kyAjjJBUfryrWXtzhfTES2ovw5mujMvhPZT6P4kyiYcDGS+IXCfo9Qg57Hf7vfYaoNzBMrXKHelKGMF18sZv8c2dg11ukJKxtJGxj94kNrshtJJBvn000/DupqaGjh9+nTDCxxk0P379xve0dwnn3wSGkXwnDx5Cgb17w5rns+obw7IsQ7iasq4YnqsgDVqG2xmP60f6x9B3XUyyHhsXv0wnBXKO0S5hKNiVSO2//i3Oy8TnKxQDjdEjoYqtmpexio49l5GCtWMv6U8G/rf0wZ8vs8MxiC00hnONYYoK7pw/Pjjj9D3/ttAKeQzKQ4XC9OXi+mxAhp3ra6AeZRDdfscf+RlsFC9ppNBF/A5kzsfoO5z/AEDCs7+cQ47JRk6Oa+9h9hMYKL28zJWwPa0QKv2yVXj8GtMv+aszW/MIGcbisuhbw5D37vbYQbV+if1zUFh2gtiuiKBhaVGLN2o4168DH4/xGQo/iYvk3AwkOtNAv1ClMMEvKOTYXLKClGuMXCMnxfs8AWVSdXr0olpMOu5meeU8TUoTi6XG8bnpIC7VKsFqK/SBoepl+SJ6WsM1NUSo/5sG3QyPuUWk0Lm42USDgaUZ8wAlWt4GZqQwBz7o2B87CfY7+PlGgMV1xar/kBDbz+TjfVzet8KP/30k6j7cwbKBJMmjIU1s9K5/kAWTSEH8P82YjrDgX2qO416Vk4GPEpoCjq4IMQ6fg0yPgc2A5XJm6bGQF7WBcg6Ho7Jgkwvk8jXUr+Al2uMqqLWLt74VKLGD2gG23d8cE6Wfh6/X4X+92bDVuyrNPQHaIjY2iWmMxzHPcr5qDfq/Ol17bEP4OX8rKMo9seUm3iZhILDPYcxQHsPXga/W6mPOIv8Ul6mMdyl2aOCM3wN1Sit0I0clnPOG5+gOC5cuAheHdeCDVUbmoLWUF3efoSY3nCgzuaJekSDr9PJeCr1TW3QHrpMklDU4HCONywF2lGQOSRGKuCztl/AXdqWFna+05f+LBjbrxns+aTmN5EBiJMnT8KAbh1g28tcLVBK08YZ37qLsixNmGGn71ZDTeq111FHXJPB/6cLz7EZcBby/iQM1WdLMQTmtR+n6iok41Wu0a9UBWXqfDbdECYc2GGayvf6ydFU79BHuv9mjE9QXOfNfQnenJ6mqwUobZRGMd3hMCtM2Je6XXuOmeRBQyapsa3l/UgYGNi1+sBYr3MPL4PfDxdlrC5VuorbXowlpJYv/aS8sidTYO3aDb+5DHD42yPwWJ9U1nltyNCsFjhKS9hi+s3AKv8toTCRm6E9R13fJOpbran8iPcjYWAA94uBYZ9go07GY3vdJMLTeZlwuEqzx/LDPnLUkcrr0QZOnDgp6vichzLBkIH3wVa+GWCZug02a9ljxPSbgbobaqJzp/Y84LW3Mujbo/zAeZE40PPHDIHhqEAn47F9pn/Oeq538TLhcM5L+4StswvV/2PD+0VV+mk6+LXXXoOlS5ca3OrVq0VxHfG8K0JxXrToFVg5taW+GcA0UlrF9JuBOrzapEmt0zW7HkUV7eL3KU15fxIC5r5ig3ExU2jPj3mVZmJE0J0K+GwRFyhwjHw9Vo1CScmEFVNawOLFFZYzAMmtX78ezjvvPEBvdY6+u+CCC0zn8+N91wyS21vjg4kDm+rSxdJGaS1ue12DBswJ7LX9J+rwqE6n1Kn22q/SZAyzhsFOt65jnhCwdK8SI4J/H9KeY677K8pwxmfz/5ZyOg6RZvPz/Zp7Nq8p27NnVekEyX7++eewb98+g/v6669FcR3xvGvGz2fOwOCe4pwAOVosav28qAczsMpXRAPj3we5526aAGp4bqNp4868HwmB2h4xIKwFQqtPqsksob9GP30ZDmdh2i4a7vFKos7TsF6t2GpbtJAhw7lIiPLRvCtCy8z5/bvA9gXtdGmjtDoLW+4S9WAG6nEBr9P6wjUz9Fycdg/a4AHej4SApXmPSU4MVUU4/pwrRjTgcxTzfpjhLslME0s+uffmt4PBvf8Sk+IjkQw/zaBwxo8daUhb0GWBuyS7pagPEdTjSEM/wGN7m3suZBAmO4T3IyGgwb/Qr1DRzJSS3vDctInI5/0wA5XRvaoo3aCgHVhq8h7+m6VtWtFA/h08eFCXCegz7fKhTmCieWH2LKh8ST+zSa6qkKU54jY61OP/6ZpWHxsJbA899znnmGSAf/B+JASMiL4zQs3BPuXP2nOMlEtsIrCzcifvhxnusnZTqnSbPYKOhk+PDe2d0AxAhv7qq6+gRYsWMHLkSGb0EydOwNy5cyE1NRXeffdd8ZW4WbhwAbwzM41bHKrPAJhmd1n7SaI+RAJe5RK9gVnh+kp7TsY21BA+ZwHvR9zUeW1/DPDGDbrTRz+r/A9NxryJUK7l/THDWZS+ip/80Ryt/T8+YoCupGqZIdY2WeP7779n28dSUlLg0ksvha5du7JdP/H4GS5uiysq2GhGNxRkjjaSpq8S9SFyrMZ+sa5gBd0pGiHQc5XmCsQMIAzP48ZfozQ1RMKjfMfLqGbrBF57B17GDDqr5y4Ve8n1GWBkTuiAht/vZ8M0GpPTLl6fzxezwfbu3Qvdu3eHDh06QJcuXeDqq6+GzZs3i2KWoDioqso2lVLcVq1axbaeaRmhomIJLJ8szAWUUEcwGyjtoj5EqJCRwQUDk0uh59jjzxE73+heFbyJD79Xaa5v/2kaWDnEy+D/tYZI+pTWvIwZOAKg41amGWA01gDHjh2DKVOmwOTJk1kVvWfPHti6dSuUlZXB8OHD2f9WMwLJUfvfvHlzmDNnDqv+KYOtWbMGsrOz4c033xRfCQv5Re/TDmPaZr5hwwZ2qGTbtm1scynF7eOPP2Y1gHkGoJFAWo2oDzPU4L5ATrcK6TabPfPa+xkzgPXVV0tgOyRMObIxvm4nEEZCvwkEZWq99ogzUlgNfm2WAWgPQF7O/ZCfPxhobK4pnXd00GP8+PEsY1jNBASdDeDl6TOt4FndbKLVSPxJI9GRX5Rpc3IGYhMQJgNg2kV9mIG63q8vgGyL2GX0TDVbEPLYYtqLGBbMbW1E42KkPtfJeBRdNUV9hoBnU8RNIFVFGd+LU8BaDXD9X9rBkSNHGjUuPaMawuq+/njRjD948OCIM4P07KkxT8Mr44wZoH55WNeMhgMNulvsX2EGuJqeYUf7AWMGUF4X/YgLixngmE6GbU+yMA1M6/8mGWBGfjNwVrkbVbDG2coE0Rhfgyaycnpea1gUqs8AR0R9mGGWAdT6DKCanRb2KImtASw2AYZhYp23YQ9bOKpMmgBSFs2gWVGwRrIzQSzGJ0hu+YpVsOjpVF0tEGUT8LnYBOBfNt+PNcEAQwbwKhWiH3Hhr3GkRuoEYkdRGAWwVSnddnEzsCO0l88ApKQ3nk2DBQsWWFayRrIyQazGJ0hWVQMwsldL3d6A+k7gXlEfZph3Au1aJzDXmAHsi0Q/4qJurzPiMNBsHsDPTRWHQxwGUgZ4cURTqN6yPaZJIC0TVFZWRmWocAQNqMZkfA16J6/3tbo1AavDQEI1dLCZY8NA/DvCOA9gPKkVFzQRZMgA4kSQyaqU6ol8VMlsImhiTlO2lBqLsgl6b8yYMYYp31ig9+ncIK0GxuoXZeRBD90OOxbyi0LUB0iPeFZC9VX+yUT3oYkg7GxPFp5RBpgm+hM3qjjOF6aCVXH7UrBainhc2l3WbjI/FUw1wOxhTWHb9n/FVANoUKl96qmnYjYaQe9WV1ezg6Hx+jOozw26GsDqVDCWbrqIS29gjxLqO6heZ5H+OdP7o7wfCcHvUb7U9wPoSFhDG2+6Guh1RNwAicq4t35hJJQBlk1ugUpfGrfSaYKGxvexQn5MmjSJzRvEA21pG9ozXXdsjBbAqjDtoj5EUI93iYtBKr8Y5LEv1uk9WPAe4f1ICGZtPOY2NhQhVPOzait5P8xwFWe3EJsAOgA6bFCPuDPA4sWL2aneWP2hGogWjeKpiSjsdes3QukTKYatYa7itqmiPkRUw0Zbpte3tOfY9K7T24VlloirjFFjviHE3kV7HvDa79DlVBoq1tg+5v0Ih7Ow5U5+JECfnxmQAh9+tCtq45H8rl27YNOmTWxufufOnVH7oaFlAOpLvPHGGzH5Q+/k9v1b/ZUyDenDEYAl3WBv3+Q4fsNGW7oYwmAXnz3xp4PM1vuxl99Xe167z5ZqiKhXOYFDwdBBhnC4Sto+J24JIyX1u/9mdvQ6Gmi4RlU2zdH36tWL9QViMRxB71E/YsSIESwehw8fFkUahTLQvHmFsPDplrq0sS1hJW1Du3oaAw1sM9a8DVvC8P+DYtOsJuO2NgykRDAu/Q1tCmUyHtsXOplgJrmBlzED28LrDJtC0dGlC7QeYHVbGBmMSuuQIUNY25+bmxuz8Ql6l3YD0ypkQUEBq1Ws+kdyy5evgMmDUtm0ti5tRewyiYhL5QTqkLtnIajTQP0sYP0ZQv11fTQDuzfyDGzUoOeP6jMAc/N5GcOxcMqtPudTvEw4zPYFknvnuXQYPLCn5UxAeDweuOOOO2DHjh2WDRYOujuwR48e8NZbb1nuC5AcGX9CTnPhYEio+re6H/Aq4xi/YVt4wMeu6tU/5zaLJBSsyrvrOyPGgyGBfY4xhgh7bLrj4+Fwl1/yBB2gFDOAlgnyBvRgW7YiGZSe095+Wi6OJGuV/fv3w7Bhw1gzEMlPek5b2ScMNBqflX46JFp26eNi+s1A/Q0z0bmTe97FZISwhfMicfi9jk6GyAjbvnFYeKOhx+pV/LV7HRfwcmZUl7S9kC5uFkcE1BRQB2rt7DbQ6ZorwGazmRqBvvvmm29g7NixsGzZMlOZWCG/Dhw4wG4bVRTF1G/6ju4ZzMfmJ3irKB0JFzMzu1fwqKso09KljqpYowZdqAOInwcZ9J3ohSCNuhq72cGPE0c/qwwZt/4gww9ChOjvbZxXYeEPh9J+AFJgwfCmMKRnG8h/uDPcd8/fYerUqeyyR+rkVVRUMGPTBZG0xWv69Omso2ZmoERAzcHKlStZ+BQWTRBR+PPmzYPRo0ezKegbb7wR8vpcB4/1bg6vTWrBFrZC+wGjOBwaVpfc4dCAz2EyCRR57iVmVDYZpA8QSz3bmKDh9yhv6GWY3BxeJhx0QNRZmHGY7uQdn9MMhuf1gUrFAadOnWbtKhmA5uRpjwDtFKJ9fB999BG79k3bOnY2oHCoOaLdSBQ+1Tz0HTUTNGVMcTl8+AjMn78A+t53BSydlIbVfjat/h3G8b+l4+Gqx97Z0Jxi+89ftIHNQaXJCEF3l1BCsXRBBA4NTaqlA7xMYxSMTO13f5f2v1S5qplSeaPSZ9rJ+8gjj4R29Zwto5uhhU8GnzhxImzfvt3wnEYj07DWeqZfE3CVXTZQTG84UG//FIxP/an1OhmTAonucl4moWAg5YYAfQ7dfLbfY78YI3ZclMPv/5eXC8Mfrrzyym1ffdX4wgsd1aKLnUm5jcmdDSj8559/nt02Gi4ulEGWLl1G5wyHiwk2Izi8U74XdchfERPwKCbzLvomOeGo5se/VotyWFNsMEZOWSLKiTRp0qRIvMjZDHpOmYBqArr6NZJ8siDD0nrD2rVrI8aBZLH/chqTGXH8j7XsXaKe8f9TAY8jtMEG9fl3k5nX5NwNoKGaXxN3wESul6H98igBtfGrTDuQgiIpkofa3oEDB7Kp32jeixcKi84W0Kjg/ffftxw21VgdO3Z0igkXwX5VhU53XnY/0Lu8DHYGJ5voeDEvk3CCN4AaL4qs9dpb8XJ0qyVGRujB0v4A5a+8nMBk8Q7fSJAsXf1KvW+aqaPP0bwfLeQ3OdpGTk1QLCOOWbNmUVPQXkw8D+pqn3561+SiSLGWDRbMXF4mKWDA75t0BA13AGKOLeAjiKODE9hfYLtYzOjUqdO2aJWpQe9RSaRt2m+//XbCRwSa4T/88ENm+BUrVsTkP8XL5XJRBsgR08+j1tjEI+FH+Eujww4RvfZreH+Sgmo4jcqc4TpU6gyi0d3B54ofPzd6W2bXrl0PWp1qNYMMQu9TBqCqmQ5n8FvKNSNagX+HRhs0DUxDPPodISuzgeGg9+hEEyZXt4Yi4vfRr4Ion5FRUW9+dV+V7ri3an5zSCCpHUAN1fy6+LB31WPPtaWVFcFbbrllZzwZgEcrrdOmTWOGewGbh42bFPjs8wPst4S0GoJ3Z84ED5ocOnQYXO6tsGDBfLYVjFYD6eAJHfSI1fAaFC7VVJjcwWL6RY7td/wejXwF6s/wi2CqYYqYaoDKzaJcUgh3V328v1lz0UUXFUQ6BBINmmHp+NY9t6ZDyRMpMObhZpDfowXk9shkt3nybmC3LHzWCkb3aQbTcptA/uBBbOIpmpojEuQP9VUwuVeI6Y8G8ylix3hRLmmoJj8Zo8b/mzWZY8aMOZ4oZRP0Y08FL86BBWNasJ93cZcEbx7ZWp7FLnHUufJs9oymoGkmsl/XlhBpPiIayJ/a2lrIzMy0dGtKOOqXgPX7M5n+lbP3u4ZYC7xikgMXinIxkE/z+4loCkjhmzZVwrD7tR94EhdmGne2uW2h5z23JGSegd6nvkS3bt1oM2eamOhooAk1Q/WPGYK/OSzpqIbfA6BcmLCrynOefPLJQKzNAb0TCNTBjOnTYXTvFNMlWatuQ0Eb6N31cti02XwF0Ar03pYtWwD7OPSzOnH/FC3qeqZY+Gj9RZRLKo38cGSifjqtZWpq6qx+/frtpZU2qhXE3+8RXUXFYiic9yK7VCK3WwasmtYqLuOT05aiZw1pBgN7dYIpE8fCwgXlLCwxfNG98sorND+hdu7c2dW8eXMaAYXOUMSD31O5XZwjUC1sv084WOLt+ojY6SxgC1EuAdDZg0vR0WUTjbmOk3NbDXIVtdpTXdo6uO/eZIdRtI75gX5tLWsDm19ssXv0g6lkTDqXJ4YvOioMCa+WjQdwlNNq/Smhs4rqs1/t99gCwUUKcrbE3ksTB67irJurX76s1Dmv5b/cZe2DFzLV/9wcHckKZgw+c9D3wWfse1q3x3foXQf6UV3eseRc+fFoNHbnUMmnOwE9lZY2lyaF4JDQkYsRsrLS96uAxmzqKs3q6i5tN0X7+Xi6maOqKONQVXHro8zhZ/ou+Ix+Pr7dFDR4V3pX9O9cAI1/Oep8tGoyAyuRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEonk34//Byv+A25FU+SQAAAAAElFTkSuQmCC
// @license             MIT
// @run-at              document-start
// ==/UserScript==

(function () {
  "use strict";

  // 再生速度
  let rate = 1;

  // 定数
  const CONFIG = {
    STORAGE_KEY: "stream_rate",
    VIDEO_SELECTOR: ".rendererContainer video, .watch-video--player-view video",
  };

  // キーボードイベントリスナー
  const keyMap = {
    back0_25: ";", // 0.25-
    forward0_25: "'", // 0.25+
    back0_5: "[", // 0.5-
    forward0_5: "]", // 0.5+
    back1: "-", // 1-
    forward1: "=", // 1+
    rate0_5: "`", // 0.5x
    rate1: "1", // 1.0x
    rate2: "2", // 2.0x
    rate3: "3", // 3.0x
    rate4: "4", // 4.0x
  };

  // 再生速度の保存と読み込み
  const rateStorage = {
    save(rate) {
      localStorage.setItem(CONFIG.STORAGE_KEY, rate.toString());
    },
    load() {
      const savedRate = localStorage.getItem(CONFIG.STORAGE_KEY);
      return savedRate ? parseFloat(savedRate) : 1;
    },
  };

  // ビデオ要素の制御
  const videoController = {
    overlay: null,

    setRate(el = null) {
      el = el || document.querySelector(CONFIG.VIDEO_SELECTOR);
      if (el) {
        console.debug(`rate: ${rate}x`);
        el.playbackRate = rate;
      }
    },

    // 再生速度オーバーレイ
    showRateOverlay() {
      let overlay = document.getElementById("rate-overlay");

      // 既存のオーバーレイがあれば、削除して新しく作成する
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
        this.overlay = null;
      }

      // 新しいオーバーレイを作成
      overlay = document.createElement("div");
      overlay.id = "rate-overlay";
      overlay.style.position = "fixed";
      overlay.style.top = "50%";
      overlay.style.left = "50%";
      overlay.style.transform = "translate(-50%, -50%) scale(0.5)";
      overlay.style.background = "rgba(0, 0, 0, 0.7)";
      overlay.style.color = "white";
      overlay.style.width = "96px";
      overlay.style.height = "96px";
      overlay.style.fontSize = "24px";
      overlay.style.fontWeight = "bold";
      overlay.style.borderRadius = "50%";
      overlay.style.zIndex = "calc(infinity)";
      overlay.style.opacity = "0";
      overlay.style.transition =
        "opacity 0.3s ease-out, transform 0.3s ease-out";
      overlay.style.display = "flex";
      overlay.style.justifyContent = "center";
      overlay.style.alignItems = "center";

      // フルスクリーン要素があればそこに、なければbodyに追加
      const container = document.fullscreenElement || document.body;
      container.appendChild(overlay);

      this.overlay = overlay;

      overlay.innerText = `${rate}x`;

      requestAnimationFrame(() => {
        overlay.style.opacity = "1";
        overlay.style.transform = "translate(-50%, -50%) scale(1)";
      });

      if (this.overlayTimeout) {
        clearTimeout(this.overlayTimeout);
      }

      this.overlayTimeout = setTimeout(() => {
        overlay.style.opacity = "0";
        overlay.style.transform = "translate(-50%, -50%) scale(0.5)";

        this.overlayFadeTimeout = setTimeout(() => {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
            this.overlay = null;
          }
        }, 300);
      }, 500);
    },

    // フルスクリーンハンドラーの設定
    setupFullscreenHandler() {
      document.addEventListener("fullscreenchange", () => {
        // オーバーレイが表示中の場合、フルスクリーン要素に移動
        if (this.overlay && this.overlay.parentNode) {
          const container = document.fullscreenElement || document.body;
          this.overlay.parentNode.removeChild(this.overlay);
          container.appendChild(this.overlay);
        }
      });
    },
  };

  // キーイベントリスナー
  function handleKeyPress(e) {
    let newRate = rate;

    if (e.key === keyMap.rate0_5) newRate = 0.5;
    else if (e.key === keyMap.rate1) newRate = 1;
    else if (e.key === keyMap.rate2) newRate = 2;
    else if (e.key === keyMap.rate3) newRate = 3;
    else if (e.key === keyMap.rate4) newRate = 4;
    // 増減速
    else if (e.key === keyMap.back0_25 && rate > 0.25) newRate = rate - 0.25;
    else if (e.key === keyMap.forward0_25 && rate < 16) newRate = rate + 0.25;
    else if (e.key === keyMap.back0_5 && rate > 0.5) newRate = rate - 0.5;
    else if (e.key === keyMap.forward0_5 && rate < 16) newRate = rate + 0.5;
    else if (e.key === keyMap.back1 && rate > 1) newRate = rate - 1;
    else if (e.key === keyMap.forward1 && rate < 16) newRate = rate + 1;
    else return;

    // 再生速度を更新
    rate = newRate;
    videoController.setRate();
    videoController.showRateOverlay();
    rateStorage.save(rate);
  }

  // ビデオ要素の監視設定
  function setupVideoWatcher() {
    let videoEl = null;
    let rateObserver = null;

    // ビデオ要素の確認と設定
    function checkAndSetVideo() {
      const newVideoEl = document.querySelector(CONFIG.VIDEO_SELECTOR);
      if (newVideoEl && newVideoEl !== videoEl) {
        videoEl = newVideoEl;

        // ビデオの読み込み完了後に速度設定
        if (videoEl.readyState >= 1) {
          videoController.setRate(videoEl);
        } else {
          videoEl.addEventListener(
            "loadedmetadata",
            () => videoController.setRate(videoEl),
            { once: true }
          );
        }

        // 再生速度の変更を監視
        if (rateObserver) {
          rateObserver.disconnect();
        }
        rateObserver = new MutationObserver(() => {
          if (videoEl.playbackRate !== rate) {
            rate = videoEl.playbackRate;
            rateStorage.save(rate);
            videoController.showRateOverlay();
          }
        });
        rateObserver.observe(videoEl, {
          attributes: true,
          attributeFilter: ["playbackrate"],
        });
      }
    }

    // URL変更の監視
    let lastUrl = location.href;
    const urlObserver = new MutationObserver(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        console.log("URL changed, resetting video rate");
        rate = rateStorage.load();
        checkAndSetVideo();
      }
    });
    urlObserver.observe(document, { subtree: true, childList: true });

    // DOM変更の監視
    const pageObserver = new MutationObserver(() => {
      checkAndSetVideo();
    });
    pageObserver.observe(document.body, { childList: true, subtree: true });

    // クリーンアップ関数を返す
    return () => {
      if (rateObserver) rateObserver.disconnect();
      urlObserver.disconnect();
      pageObserver.disconnect();
    };
  }

  // 初期化
  function init() {
    // 保存された再生速度を読み込む
    rate = rateStorage.load();
    console.log("Initial rate:", rate);

    // キーボードイベントリスナーを設定
    window.addEventListener("keydown", handleKeyPress);

    // フルスクリーンハンドラーを設定
    videoController.setupFullscreenHandler();

    // ビデオ監視を設定
    window.addEventListener("unload", setupVideoWatcher());
  }

  // DOMContentLoaded イベントで初期化
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
