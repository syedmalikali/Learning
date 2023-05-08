from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in bismi/__init__.py
from bismi import __version__ as version

setup(
	name="bismi",
	version=version,
	description="Test",
	author="Malik",
	author_email="syedmalikali@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
