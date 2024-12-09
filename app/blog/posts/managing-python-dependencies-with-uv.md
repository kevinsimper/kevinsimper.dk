# Managing Python dependencies with UV

I have been creating a new Python project and when you start a project you always have the possibility to do things smarter than last time.

I have previous used pyenv or venv, but they never felt good for many reasons. The Python ecosystem feels more fragmented and powerful. For beginners it feels like the jump from simple dependency management to advance is a large gap.

[https://docs.astral.sh/uv/](https://docs.astral.sh/uv/)

### A new and simple package manager that scales

UV feels like the right package manager for beginners now. It takes many of the good things from the popular Cargo in Rust and brings it to Python.

One significant thing is managing python. Previously you would have to install Python yourself and make sure your installed another tool afterwards, without making a mistake connecting the tool.

Python is also often installed on many computers already, and uninstalling that system python can lead to other things not working in your system.

## How to use UV

You make a new project by calling `uv init`. After that you are ready to do `uv run hello.py` which has been created for you, and you are running your first python program correctly.

Then you can add dependencies with `uv add gradio` and it is correctly added to your `pyproject.toml` with a `uv.lock` which if you are coming from Node.js looks very familiar.

## UV workspaces scales with you

UV has a feature called workspaces that enables you to quickly scale your growing python project. UV is however still a relative new tool so documentation is amazing but still new. I have made a small example of how you can use UV workspaces to share code in a similar regard like Turborepo allows you.

[https://github.com/kevinsimper/fastapi-uv-workspaces-demo](https://github.com/kevinsimper/fastapi-uv-workspaces-demo)

## Conclusion

UV is the new kid on the block, but it looks to be it is here to stay. Amazing work by the Astral company [https://astral.sh/](https://astral.sh/)