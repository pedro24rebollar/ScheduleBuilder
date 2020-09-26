total_growth = 0

yearly_investment = 12000
interest = .07
years = 30

for x in range(years):
    if x == 0:
        total_growth = yearly_investment * (1 + interest)
    else:
        total_growth += yearly_investment
        total_growth = total_growth * (1 + interest)

print(round(total_growth))
