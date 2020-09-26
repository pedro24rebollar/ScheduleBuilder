from flask import Flask, render_template, request
from database import CreateSection, getAllSections, getAllSectionsByCourse, getSectionByCRN

app = Flask(__name__)

@app.route('/')
def start():
    array = []

    return render_template('home.html', info=array)


@app.route('/home')
def home():
    user_database = [
        {"name": "Pedro Rebollar"},
        {"name": "Pedro Rebollar"},
        {"name": "Pedro Rebollar"},
        {"name": "Pedro Rebollar"},
        {"name": "Pedro Rebollar"},
    ]

    return render_template('home.html', user_database=user_database)


@app.route('/courses')
def courses():

    return render_template('courses.html')


# Create five different classes, each with 8 sections
def createFakeData():
    CreateSection("C", "13938", "CS 4242", "01", "Marietta Campus", "3.000", "Artificial Intelligence", "TR", "14:00:00", "15:15:00", 0, 35, "Chih - Cheng Hung(P)", "01/07 - 05/06", "Atrium Building", "152", "3.6")
    CreateSection("C", "13938", "CS 4242", "01", "Kennesaw Campus", "3.000", "Artificial Intelligence", "TR", "13:30:00", "14:45:00", 0, 35, "Chih - Cheng Hung(P)", "01/07 - 05/06", "Atrium Building", "152", "4.4")
    CreateSection("C", "13938", "CS 4242", "01", "Kennesaw Campus", "3.000", "Artificial Intelligence", "MW", "09:00:00", "10:15:00", 0, 35, "Chih - Cheng Hung(P)", "01/07 - 05/06", "Atrium Building", "152", "2.8")
    CreateSection("C", "13938", "CS 4242", "01", "Marietta Campus", "3.000", "Artificial Intelligence", "TR", "10:00:00", "11:15:00", 0, 35, "Chih - Cheng Hung(P)", "01/07 - 05/06", "Atrium Building", "152", "3.2")
    CreateSection("C", "13938", "CS 4242", "01", "Marietta Campus", "3.000", "Artificial Intelligence", "MW", "10:30:00", "11:45:00", 0, 35, "Chih - Cheng Hung(P)", "01/07 - 05/06", "Atrium Building", "152", "1.2")
    CreateSection("C", "13938", "CS 4242", "01", "Marietta Campus", "3.000", "Artificial Intelligence", "MW", "12:00:00", "18:15:00", 0, 35, "Chih - Cheng Hung(P)", "01/07 - 05/06", "Atrium Building", "152", "1.8")
    CreateSection("C", "13938", "CS 4242", "01", "Kennesaw Campus", "3.000", "Artificial Intelligence", "TR", "11:00:00", "12:15:00", 0, 35, "Chih - Cheng Hung(P)", "01/07 - 05/06", "Atrium Building", "152", "3.0")
    CreateSection("C", "13938", "CS 4242", "01", "Marietta Campus", "3.000", "Artificial Intelligence", "TR", "15:00:00", "16:15:00", 0, 35, "Chih - Cheng Hung(P)", "01/07 - 05/06", "Atrium Building", "152", "2.3")

    CreateSection("C", "13938", "CS 4722", "01", "Kennesaw Campus", "3.000", "Computer Graphics", "TR", "13:00:00", "14:15:00", 0, 35, "Ben Setzer", "01/07 - 05/06", "Atrium Building", "152", "4.6")
    CreateSection("C", "13938", "CS 4722", "01", "Kennesaw Campus", "3.000", "Computer Graphics", "TR", "08:00:00", "09:15:00", 0, 35, "Ben Setzer", "01/07 - 05/06", "Atrium Building", "152", "4.3")
    CreateSection("C", "13938", "CS 4722", "01", "Kennesaw Campus", "3.000", "Computer Graphics", "TR", "10:00:00", "11:15:00", 0, 35, "Ben Setzer", "01/07 - 05/06", "Atrium Building", "152", "3.2")
    CreateSection("C", "13938", "CS 4722", "01", "Kennesaw Campus", "3.000", "Computer Graphics", "MW", "12:30:00", "13:45:00", 0, 35, "Ben Setzer", "01/07 - 05/06", "Atrium Building", "152", "3.3")
    CreateSection("C", "13938", "CS 4722", "01", "Kennesaw Campus", "3.000", "Computer Graphics", "MW", "12:00:00", "13:15:00", 0, 35, "Ben Setzer", "01/07 - 05/06", "Atrium Building", "152", "3.7")
    CreateSection("C", "13938", "CS 4722", "01", "Marietta Campus", "3.000", "Computer Graphics", "MW", "14:00:00", "15:15:00", 0, 35, "Ben Setzer", "01/07 - 05/06", "Atrium Building", "152", "2.6")
    CreateSection("C", "13938", "CS 4722", "01", "Marietta Campus", "3.000", "Computer Graphics", "TR", "14:00:00", "15:15:00", 0, 35, "Ben Setzer", "01/07 - 05/06", "Atrium Building", "152", "4.4")
    CreateSection("C", "13938", "CS 4722", "01", "Marietta Campus", "3.000", "Computer Graphics", "TR", "15:30:00", "16:45:00", 0, 35, "Ben Setzer", "01/07 - 05/06", "Atrium Building", "152", "3.9")

    CreateSection("C", "13938", "CS 3100", "01", "Kennesaw Campus", "3.000", "Algorithm Analysis", "TR", "13:00:00", "14:15:00", 0, 35, "Glen Young", "01/07 - 05/06", "Atrium Building", "152", "2.5")
    CreateSection("C", "13938", "CS 3100", "01", "Kennesaw Campus", "3.000", "Algorithm Analysis", "TR", "13:30:00", "14:45:00", 0, 35, "Glen Young", "01/07 - 05/06", "Atrium Building", "152", "2.4")
    CreateSection("C", "13938", "CS 3100", "01", "Kennesaw Campus", "3.000", "Algorithm Analysis", "TR", "13:30:00", "14:45:00", 0, 35, "Glen Young", "01/07 - 05/06", "Atrium Building", "152", "3.2")
    CreateSection("C", "13938", "CS 3100", "01", "Kennesaw Campus", "3.000", "Algorithm Analysis", "MW", "14:00:00", "15:15:00", 0, 35, "Glen Young", "01/07 - 05/06", "Atrium Building", "152", "4.5")
    CreateSection("C", "13938", "CS 3100", "01", "Kennesaw Campus", "3.000", "Algorithm Analysis", "MW", "16:00:00", "17:15:00", 0, 35, "Glen Young", "01/07 - 05/06", "Atrium Building", "152", "3.5")
    CreateSection("C", "13938", "CS 3100", "01", "Kennesaw Campus", "3.000", "Algorithm Analysis", "MW", "15:00:00", "16:15:00", 0, 35, "Glen Young", "01/07 - 05/06", "Atrium Building", "152", "1.8")
    CreateSection("C", "13938", "CS 3100", "01", "Kennesaw Campus", "3.000", "Algorithm Analysis", "MW", "15:30:00", "15:45:00", 0, 35, "Glen Young", "01/07 - 05/06", "Atrium Building", "152", "1.8")
    CreateSection("C", "13938", "CS 3100", "01", "Kennesaw Campus", "3.000", "Algorithm Analysis", "MW", "16:00:00", "17:15:00", 0, 35, "Glen Young", "01/07 - 05/06", "Atrium Building", "152", "2.5")

    CreateSection("C", "13938", "CS 3005", "01", "Marietta Campus", "3.000", "Computer Organization", "TR", "10:00:00", "11:15:00", 0, 35, "Victor Clincy", "01/07 - 05/06", "Atrium Building", "152", "3.5")
    CreateSection("C", "13938", "CS 3005", "01", "Marietta Campus", "3.000", "Computer Organization", "MW", "13:00:00", "14:15:00", 0, 35, "Victor Clincy", "01/07 - 05/06", "Atrium Building", "152", "3.5")
    CreateSection("C", "13938", "CS 3005", "01", "Marietta Campus", "3.000", "Computer Organization", "TR", "13:00:00", "14:15:00", 0, 35, "Victor Clincy", "01/07 - 05/06", "Atrium Building", "152", "3.2")
    CreateSection("C", "13938", "CS 3005", "01", "Marietta Campus", "3.000", "Computer Organization", "MW", "12:30:00", "13:45:00", 0, 35, "Victor Clincy", "01/07 - 05/06", "Atrium Building", "152", "2.6")
    CreateSection("C", "13938", "CS 3005", "01", "Marietta Campus", "3.000", "Computer Organization", "TR", "12:30:00", "13:45:00", 0, 35, "Victor Clincy", "01/07 - 05/06", "Atrium Building", "152", "3.2")
    CreateSection("C", "13938", "CS 3005", "01", "Marietta Campus", "3.000", "Computer Organization", "MW", "15:00:00", "16:15:00", 0, 35, "Victor Clincy", "01/07 - 05/06", "Atrium Building", "152", "2.8")
    CreateSection("C", "13938", "CS 3005", "01", "Marietta Campus", "3.000", "Computer Organization", "MW", "10:00:00", "11:15:00", 0, 35, "Victor Clincy", "01/07 - 05/06", "Atrium Building", "152", "2.5")
    CreateSection("C", "13938", "CS 3005", "01", "Marietta Campus", "3.000", "Computer Organization", "TR", "16:00:00", "17:15:00", 0, 35, "Victor Clincy", "01/07 - 05/06", "Atrium Building", "152", "2.4")

    CreateSection("C", "13938", "CS 2400", "01", "Kennesaw Campus", "3.000", "Intro to Programming 2", "MW", "17:30:00", "18:45:00", 0, 35, "David Guo", "01/07 - 05/06", "Atrium Building", "152", "4.6")
    CreateSection("C", "13938", "CS 2400", "01", "Marietta Campus", "3.000", "Intro to Programming 2", "TR", "17:00:00", "18:15:00", 0, 35, "David Guo", "01/07 - 05/06", "Atrium Building", "152", "4.6")
    CreateSection("C", "13938", "CS 2400", "01", "Marietta Campus", "3.000", "Intro to Programming 2", "MW", "14:00:00", "15:15:00", 0, 35, "David Guo", "01/07 - 05/06", "Atrium Building", "152", "3.6")
    CreateSection("C", "13938", "CS 2400", "01", "Kennesaw Campus", "3.000", "Intro to Programming 2", "MW", "13:00:00", "14:15:00", 0, 35, "David Guo", "01/07 - 05/06", "Atrium Building", "152", "4.2")
    CreateSection("C", "13938", "CS 2400", "01", "Kennesaw Campus", "3.000", "Intro to Programming 2", "TR", "12:00:00", "13:15:00", 0, 35, "David Guo", "01/07 - 05/06", "Atrium Building", "152", "4.2")
    CreateSection("C", "13938", "CS 2400", "01", "Marietta Campus", "3.000", "Intro to Programming 2", "MW", "14:00:00", "15:15:00", 0, 35, "David Guo", "01/07 - 05/06", "Atrium Building", "152", "3.5")
    CreateSection("C", "13938", "CS 2400", "01", "Marietta Campus", "3.000", "Intro to Programming 2", "TR", "15:30:00", "16:45:00", 0, 35, "David Guo", "01/07 - 05/06", "Atrium Building", "152", "3.5")
    CreateSection("C", "13938", "CS 2400", "01", "Marietta Campus", "3.000", "Intro to Programming 2", "MW", "12:30:00", "13:45:00", 0, 35, "David Guo", "01/07 - 05/06", "Atrium Building", "152", "3.8")


def parseCourse(course):
    dict = {}                      # Create dictionary to hold an individual course
    key = course[0].get("course")  # Create dictionary key for the course
    dict[key] = course             # Key value equals course data
    # Example dict = {"CS 4242": course_database}
    return dict


class_list = {}

course = getAllSectionsByCourse("CS 4242")
key = course[0].get("course")       # Create dictionary key for the course
class_list[key] = course            # Key value equals course data

course = getAllSectionsByCourse("CS 4722")
key = course[0].get("course")       # Create dictionary key for the course
class_list[key] = course            # Key value equals course data

course = getAllSectionsByCourse("CS 2400")
key = course[0].get("course")       # Create dictionary key for the course
class_list[key] = course            # Key value equals course data

course = getAllSectionsByCourse("CS 3100")
key = course[0].get("course")       # Create dictionary key for the course
class_list[key] = course            # Key value equals course data

course = getAllSectionsByCourse("CS 3005")
key = course[0].get("course")       # Create dictionary key for the course
class_list[key] = course            # Key value equals course data

@app.route('/schedule_builder')
def schedule_builder():
    # Format (course_database format is in database.py
    # array = [ {"CS 4242": course_database},
    #           {"CS 4722": course_database},
    #           {"CS 2400": course_database},
    #           {"CS 3100": course_database},
    #           {"CS 3005": course_database} ]
    #
    # course_database = [ {}, {}, {}, {}, {}, {} ...]
    # createFakeData()

    global class_list

    return render_template('schedule_builder.html', class_list=class_list)


if __name__ == '__main__':
    app.run(host="localhost", port=4000, debug=True)
