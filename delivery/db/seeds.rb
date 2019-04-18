chicken_nuggets = Meal.create(:name => "Chicken nuggets")
burger_and_fries = Meal.create(:name => "Burger and fries")
fresh_salad = Meal.create(:name => "Fresh salad")

brad = User.create(:name => 'brad', :password => 'password')
betty_sue = User.create(:name => 'betty sue', :password => 'password')
admin = User.create(:name => 'admin', :password => 'password', :admin => true)

first_order = Order.create(:meal => chicken_nuggets, :user => brad, :quantity => 2)
second_order = Order.create(:meal => burger_and_fries, :user => brad, :quantity => 1)
third_order = Order.create(:meal => fresh_salad, :user => betty_sue, :quantity => 4)