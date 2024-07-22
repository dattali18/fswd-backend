#python #pytorch #tensor #operations

# PyTorch

## Tensor operations

1. basic math operations

```python
import torch
```

```python
torch.tensor([1.0, 2.0, 3.0])
```

```output
tensor([1., 2., 3.])
```

```python
torch.ones(3)
```

```output
tensor([1., 1., 1.])
```

```python
torch.zeros(2, 3)
```

```output
tensor([[0., 0., 0.],
[0., 0., 0.]])
```  
  
```python
torch.randn(3, 3)
```

```output
tensor([[-0.1477, -0.1663, 1.2852],
[-0.2432, 0.8163, 0.1741],
[-3.0049, -0.2027, 0.3979]])
```

```python
x = torch.tensor([1.0, 2.0, 3.0])
y = torch.tensor([4.0, 5.0, 6.0])
x + y
```

```ouput
tensor([5., 7., 9.])
```
  
```python
x - y
```

```ouput
tensor([-3., -3., -3.])
```

```python
x * y
```

```ouput
tensor([ 4., 10., 18.])
```
  
```python
x / y
```

```output
tensor([0.2500, 0.4000, 0.5000])
```

```python
x * 2
```  

```ouput
tensor([2., 4., 6.])
```
  
```python
x + 2
```

```output
tensor([3., 4., 5.])
```
  
```python
x ** 2
```

```ouput
tensor([1., 4., 9.])
```
  
In pytorch using method with '_' means that the operation is in place

```python
print(y)
y.add_(x)
print(y)
```

```outout
tensor([4., 5., 6.])
tensor([5., 7., 9.])
```
  
2. Slicing operations

```python
x = torch.randn(3, 3)
print(x)
print(x[:, 0]) # returns the first column
print(x[0, :]) # returns the first row
print(x[0, 1]) # returns the element at the first row and second column
```

```output
tensor([[ 0.6720, 1.6719, 1.5661],
[-1.5738, -1.3012, -0.1662],
[ 0.0767, 1.4851, 0.5772]])
tensor([ 0.6720, -1.5738, 0.0767])
tensor([0.6720, 1.6719, 1.5661])
tensor(1.6719)
```

3. Reshaping operations

```python
y = x.view(9)
y
```

```output
tensor([ 0.6720, 1.6719, 1.5661, -1.5738, -1.3012, -0.1662, 0.0767, 1.4851,
0.5772])
```
  
```python
z = x.view(-1)
z
```

```ouput
tensor([ 0.6720, 1.6719, 1.5661, -1.5738, -1.3012, -0.1662, 0.0767, 1.4851,
0.5772])
```
  
4. using numpy array

```python
import numpy as np
```

```python
a = torch.ones(5)
b = a.numpy()
type(b)
```

  ```output
numpy.ndarray
```

  ```python
a.add_(1)
print(a)
print(b)
```

```output
tensor([2., 2., 2., 2., 2.])
[2. 2. 2. 2. 2.]
```
  
As you saw `a` and `b` share the same memory location (if the tensor is on `cpu`)

```python
a = np.ones(5)
b = torch.from_numpy(a)
type(b)
```

```output
torch.Tensor
```
  
```python
b.add_(1)
print(a)
print(b)
```

```output
[2. 2. 2. 2. 2.]
tensor([2., 2., 2., 2., 2.], dtype=torch.float64)
```


As you saw `a` and `b` share the same memory location (even in the case of going from `numpy` to `torch`)

5. using GPU
```python
if torch.cuda.is_available():
	print("CUDA is available")
	device = torch.device("cuda")
	x = torch.ones(5, device=device)
	y = torch.ones(5)
	y = y.to(device)
else:
	print("This is a CPU-only machine")
```

As you see in the example above, you can easily move tensors to the GPU by using the `.to` method.

Or you can use the `device=torch.device("cuda")` parameter in the tensor constructor.