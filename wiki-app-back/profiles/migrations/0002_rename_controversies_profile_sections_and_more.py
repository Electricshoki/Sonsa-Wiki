# Generated by Django 5.1.7 on 2025-03-24 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='controversies',
            new_name='sections',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='info',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='traits',
        ),
        migrations.AlterField(
            model_name='profile',
            name='footnotes',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='id',
            field=models.CharField(max_length=50, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='profile',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]
