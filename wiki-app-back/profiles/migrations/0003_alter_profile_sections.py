# Generated by Django 5.1.7 on 2025-03-24 09:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0002_rename_controversies_profile_sections_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='sections',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
