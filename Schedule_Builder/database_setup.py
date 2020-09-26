from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()


# Account Database ==================================================================================
class Account(Base):
    __tablename__ = 'account'

    id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
    email = Column(String(250), nullable=False)
    password = Column(String(250), nullable=False)


class Course(Base):
    __tablename__ = 'course'

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False, unique=True)


# Course Database =================================================================================
class Section(Base):
    __tablename__ = 'section'

    id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
    status = Column(String(250), nullable=False)
    crn = Column(String(250), nullable=False)
    course = Column(String(250), nullable=False)
    section = Column(String(250), nullable=False)
    campus = Column(String(250), nullable=False)
    hours = Column(String(250), nullable=False)
    course_name = Column(String(250), nullable=False)
    days = Column(String(250), nullable=False)                   # Change to datetime object
    startTime = Column(String(250), nullable=False)                   # Change to datetime object
    endTime = Column(String(250), nullable=False)                   # Change to datetime object
    filled_seats = Column(Integer, nullable=False)
    total_seats = Column(Integer, nullable=False)
    professor = Column(String(250), nullable=False)
    date = Column(String(250), nullable=False)                   # Change to datetime object
    building = Column(String(250), nullable=False)
    room = Column(String(250), nullable=False)
    professor_rating = Column(String(250), nullable=False)

    # course_id = Column(Integer, ForeignKey('course.id'))
    # course_parent = relationship(Course)

    # We added this serialize function to be able to send JSON objects in a serializable format
    @property
    def serialize(self):
        return {
            'id': self.id,
            'status': self.status,
            'crn': self.crn,
            'course': self.course,
            'section': self.section,
            'campus': self.campus,
            'hours': self.hours,
            'course_name': self.course_name,
            'days': self.days,
            'startTime': self.startTime,
            'endTime': self.endTime,
            'filled_seats': self.filled_seats,
            'total_seats': self.total_seats,
            'professor': self.professor,
            'date': self.date,
            'building': self.building,
            'room': self.room,
            'professor_rating': self.professor_rating,
        }


engine = create_engine('sqlite:///schedule_builder.db', connect_args={'check_same_thread': False})

Base.metadata.create_all(engine)
