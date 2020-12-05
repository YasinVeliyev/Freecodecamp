import re
p = re.compile("\d+\s[*|/]")
f = re.compile("\d+")
def arithmetic_arranger(arr,bo = False):
    a=[]
    b=[]
    answer = []
    sh = []
    if len(arr) > 5:
        return "Error: Too many problems."
    
    for i in arr:
        k = i.split(" ",1)
        j = len(sorted(f.findall(i),key=len)[1]) + 2
        sh.append("-" * j)
        if p.match(i):
            return "Error: Operator must be '+' or '-'."
        
        elif len(k[0]) >4 or len(k[1].split()[1]) > 4:
            return "Error: Numbers cannot be more than four digits."
        
        elif  k[0].isnumeric() and k[1].split()[1].isnumeric():
            answer.append(str(eval(i)).rjust(j))
            a.append(k[0].rjust(j," "))
            m = k[1].replace(" "," "* (j - len(k[1].replace(" ",""))))
            b.append(m)
            
        else:
            return "Error: Numbers must only contain digits."

    if bo:
        return "    ".join(a)+ "\n"+ "    ".join(b) + "\n" + "    ".join(sh) + "\n" + "    ".join(answer)
    return "    ".join(a)+ "\n"+ "    ".join(b) + "\n" + "    ".join(sh)
