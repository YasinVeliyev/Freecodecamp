class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def __str__(self):
        return f"{self.__class__.__name__}(width={self.width}, height={self.height})"

    def set_height(self,height):
        self.height = height
    
    def set_width(self,width):
        self.width = width
    
    def get_area(self):
        return self.height * self.width
    
    def get_perimeter(self):
        return 2 * (self.width + self.height)
    
    def get_diagonal(self):
        return (self.width ** 2 + self.height ** 2) ** 0.5
    
    def get_picture(self):
        if self.width > 50 or self.height >50:
            return "Too big for picture."
        l = []
        for i in range(self.height):
            l.append("*" * self.width + "\n")
        return "".join(l)
    
    def get_amount_inside(self,other):
        return self.width // other.width * self.height // other.height



class Square(Rectangle):
    def __init__(self, length):
      self.length = length
      super().__init__(self.length, self.length)
    
    def __str__(self):
        return f"{self.__class__.__name__}(side={self.width})"

    def set_width(self,width):
         self.width = self.height = width
        
    def set_height(self,height):
         self.width = self.height = height
    
    def set_side(self, side):
        self.width = self.height = side