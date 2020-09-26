from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Account, Course, Section
from json import dumps, dump
""" This python program performed all of CRUD operations with SQLAlchemy
on an SQLite database."""

engine = create_engine('sqlite:///schedule_builder.db', connect_args={'check_same_thread': False})
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()


# ==================================================================================================
def Create_Account(email, password, user_id, user_type):
    """It creates a new Account"""
    account = Account(
        email=email,
        password=password)
    session.add(account)
    session.commit()


def parseAccounts(accounts):
    list = []
    for account in accounts:
        dict = {
            'id': account.id,
            'name': account.name,
            'password': account.password,
            'user_id': account.user_id,
            'user_type': account.user_type,
        }
        list.append(dict)
    return list


def getAllAccounts():
    """Print information from database using the query method in SQLAlchemy"""
    accounts = session.query(Account).all()
    list = parseAccounts(accounts)
    return list


def getAccountByID(account_id):
    """Print information from database using the query method in SQLAlchemy"""
    account = session.query(Account).filter_by(id=account_id).first()
    account = parseAccounts(account)
    return account


# ================================================================================================
def CreateSection(status, crn, course, section, campus, hours, course_name, days, startTime, endTime, filled_seats, total_seats,
                  professor, date, building, room, professor_rating):
    """It creates a new Doctor"""

    section = Section(
            status=status,
            crn=crn,
            course=course,
            section=section,
            campus=campus,
            hours=hours,
            course_name=course_name,
            days=days,
            startTime=startTime,
            endTime=endTime,
            filled_seats=filled_seats,
            total_seats=total_seats,
            professor=professor,
            date=date,
            building=building,
            room=room,
            professor_rating=professor_rating,
    )
    session.add(section)
    session.commit()


def parseSections(sections):
    list = []
    for section in sections:
        dict = {
            'id': section.id,
            'status': section.status,
            'crn': section.crn,
            'course': section.course,
            'section': section.section,
            'campus': section.campus,
            'hours': section.hours,
            'course_name': section.course_name,
            'days': section.days,
            'startTime': section.startTime,
            'endTime': section.endTime,
            'filled_seats': section.filled_seats,
            'total_seats': section.total_seats,
            'professor': section.professor,
            'date': section.date,
            'building': section.building,
            'room': section.room,
            'professor_rating': section.professor_rating,
        }
        list.append(dict)
    return list


def getAllSections():
    """Print information from database using the query method in SQLAlchemy"""
    sections = session.query(Section).all()
    list = parseSections(sections)
    return list


def getAllSectionsByCourse(course):
    """Print information from database using the query method in SQLAlchemy"""
    section = session.query(Section).filter_by(course=course).all()
    section = parseSections(section)
    return section


def getSectionByCRN(crn):
    """Print information from database using the query method in SQLAlchemy"""
    section = session.query(Section).filter_by(crn=crn).first()
    dict = {
        'id': section.id,
        'status': section.status,
        'crn': section.crn,
        'course': section.course,
        'section': section.section,
        'campus': section.campus,
        'hours': section.hours,
        'course_name': section.course_name,
        'days': section.days,
        'startTime': section.startTime,
        'endTime': section.endTime,
        'filled_seats': section.filled_seats,
        'total_seats': section.total_seats,
        'professor': section.professor,
        'date': section.date,
        'building': section.building,
        'room': section.room,
        'professor_rating': section.professor_rating,
    }
    return dict


if __name__ == '__main__':
    test = "something"

    print(getAllSections())
    # print(getAllSectionsByCourse("CS 4242"))
    # print(getSectionByCRN("13938"))

