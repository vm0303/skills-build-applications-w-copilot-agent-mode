from django.core.management.base import BaseCommand
from octofit_tracker import models
from django.db import connection

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete all data in correct order (child before parent), only objects with non-null id
        models.Activity.objects.filter(id__isnull=False).delete()
        models.Leaderboard.objects.filter(id__isnull=False).delete()
        models.Workout.objects.filter(id__isnull=False).delete()
        models.User.objects.filter(id__isnull=False).delete()
        models.Team.objects.filter(id__isnull=False).delete()

        # Ensure unique index on email field for User collection
        from django.conf import settings
        from pymongo import MongoClient
        db_url = settings.DATABASES['default']['CLIENT']['host']
        db_name = settings.DATABASES['default']['NAME']
        client = MongoClient(db_url)
        db = client[db_name]
        db['octofit_tracker_user'].create_index('email', unique=True)

        # Create teams
        marvel = models.Team.objects.create(name='Marvel')
        dc = models.Team.objects.create(name='DC')

        # Create users
        ironman = models.User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel)
        captain = models.User.objects.create(name='Captain America', email='cap@marvel.com', team=marvel)
        batman = models.User.objects.create(name='Batman', email='batman@dc.com', team=dc)
        superman = models.User.objects.create(name='Superman', email='superman@dc.com', team=dc)

        # Create activities
        models.Activity.objects.create(user=ironman, type='Run', duration=30, calories=300)
        models.Activity.objects.create(user=captain, type='Swim', duration=45, calories=400)
        models.Activity.objects.create(user=batman, type='Bike', duration=60, calories=500)
        models.Activity.objects.create(user=superman, type='Yoga', duration=50, calories=200)

        # Create workouts
        models.Workout.objects.create(name='Morning Cardio', description='Cardio for all heroes', difficulty='Medium')
        models.Workout.objects.create(name='Strength Training', description='Strength for all heroes', difficulty='Hard')

        # Create leaderboard
        models.Leaderboard.objects.create(user=ironman, points=1000)
        models.Leaderboard.objects.create(user=captain, points=900)
        models.Leaderboard.objects.create(user=batman, points=950)
        models.Leaderboard.objects.create(user=superman, points=1100)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
